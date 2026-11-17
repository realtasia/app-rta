# The Application That Ate the Other Five Repositories

`app-rta` is the largest RealtAsia repository because it is where the separate ideas become one system.

The API owns the resources and permissions. The queue moves work away from the request. The notification code decides what an event means. The socket service delivers it live. The deployment repository puts everything on the internet. This application binds all of them into the thing people actually used.

Most of RealtAsia’s browser application lives here. The JavaScript is the client-side domain and orchestration layer.

PHP rendered the initial shell, assembled the first view and brokered the API. A substantial Knockout application then took over: typed client models, observable state, reusable behaviours, asynchronous navigation, filtering, pagination, media handling, a six-stage listing editor, messaging, registration, billing, administration and live event reconciliation.

The spelling of `dependancies.js` is questionable. Its contents are distressingly serious.

The early commits reveal the scale before the file tree does:

> **“Edited all controllers to use new API classes and cleaned up. Must update documentation”**  
> [`8ca089c`](https://github.com/realtasia/app-rta/commit/8ca089cbe135c42e7f8598190b127c95787ca0de)

> **“Fixed interaction logic bugs, subscription error and missing jcrop css files”**  
> [`17c2241`](https://github.com/realtasia/app-rta/commit/17c2241266db52111474aa54b68bb8e69598e03c)

> **“Using Mongodb for sessions… Almost completed media lib functionality. Some bug fixes”**  
> [`7fdda54`](https://github.com/realtasia/app-rta/commit/7fdda54db04f7632e815fb18aff53d1340fc844e)

API consolidation, interaction semantics, shared database sessions and a media product were apparently a reasonable four-day workload.

## What the application does

RealtAsia’s application did four unusually ambitious things at once:

1. It treated people, companies, places, posts, property listings, albums, files, testimonials and conversations as parts of one connected product rather than unrelated pages.
2. It let the API tell the browser what each object was allowed to do.
3. It kept the interface as a live model in memory, so changes propagated through counters, lists, forms and permissions without rebuilding the page.
4. It connected that same model to background queues and sockets, so an action elsewhere could appear in the page already being viewed.

The code is uneven in the ordinary way that live product code is uneven. The architecture underneath it is remarkably consistent.

## PHP renders the opening position; JavaScript plays the match

The main template serialises the current user, current profile or place, current result collection, access token, state token, campaign and page type into the document. The browser decodes those values and turns them into observable application objects.

That gives the product a hybrid rendering model:

- PHP handles routes, sessions, initial API calls, metadata and the first useful page;
- the first dataset is embedded into the response, avoiding a second round trip after load;
- JavaScript hydrates that data into behavioural models;
- subsequent searches, pages, edits and interactions happen asynchronously;
- the URL hash provides client-side routes for media, settings and conversations;
- administrators receive additional JavaScript only after their role is known.

Today this would be described with terms such as hydration, backend-for-frontend and progressive enhancement. In this repository it is mostly described by comments including “just to solve cross-domain issues and other heap of benefits”.

The benefits were real. The PHP `/api` action acted as a same-origin broker to the separate API service. The browser’s common request wrapper attached the access and state tokens, routed API traffic through that broker, tracked global request state and accepted a refreshed token from any successful response. The application therefore had a coherent browser-to-app-to-API session path rather than every feature inventing authentication again.

Relevant code:

- [the application shell](./application/views/template.php)
- [the browser/API bridge](./application/classes/controller/auth.php)
- [the PHP API client](./application/classes/api.php)
- [API response and token handling](./application/classes/api/response.php)
- [the JavaScript application root](./js/app.js)

The 9 August 2013 consolidation is the turning point: controllers stopped making individual API arrangements and began using the shared request/response layer. Its “Must update documentation” note then waited thirteen years and matured into archival material.

## The JavaScript has an object system

The central mechanism is `RTC.CreateLoop`. It examines the `type` returned by the API and constructs the appropriate client object:

- `post` and `wallpost` become `RT.Post`;
- `album` becomes `RT.Album`;
- `attachment` becomes `RT.Attachment`;
- `testimonial` becomes `RT.Testimonial`;
- `listing` becomes `RT.Listing`;
- `conversation` becomes `RT.Conversation`;
- other resource-shaped results become `RT.Page`.

The common `RTC.Loop` mapper recursively turns the payload’s important structures into observable state:

- `actions`: operations the current viewer may perform;
- `connections`: URLs of related resources;
- `counts`: likes, subscribers, comments, attachments and other totals;
- `comments`: nested comment models;
- `attachments`: nested typed models.

Then a small extension system composes shared behaviour onto the mapped object. `Page`, `Testimonial`, `Album`, `Listing` and `Attachment` all inherit from `Post`, which inherits the common loop behaviour.

That is the heart of the application. It is a domain model in the browser, implemented before “frontend state architecture” became an industry with conferences and dietary requirements. The code uses global namespaces, but it is not globally confused.

### The API returned capabilities, not merely records

The most interesting part is that the JavaScript generally does not have to invent the URL for liking, unliking, subscribing, unsubscribing, hiding, reporting, changing privacy or deleting a particular object. It reads those URLs from the object’s `actions` map.

Likewise, it discovers comments, attachments, feeds, conversations and related collections through `connections`.

This is a HATEOAS-like design in practical clothes. The API supplied the verbs; the browser did not need a committee meeting to invent them. The server response says:

- what this thing is;
- what state it is in;
- what related resources exist;
- which operations are available to this viewer;
- where those operations live.

The browser turns that description into behaviour.

That matters for permissions. The interface does not merely contain every possible button and hope the server objects. It can render the capabilities supplied for that user and resource. The API remains authoritative, while the client remains generic.

### One interaction grammar, used everywhere

The generic interaction helper reads the current observable state and selects the corresponding server action:

- liked → use `unlike`;
- not liked → use `like`;
- subscribed → use `unsubscribe`;
- not subscribed → use `subscribe`.

It then changes the label and link to reflect the *next* available action.

The model listens in the other direction too. When the `like` observable changes, the liker count moves by one. Liking also turns subscription on. When subscription changes, its count follows. Profile previews update their small liker/subscriber collections so the visible people agree with the visible totals.

That creates a bidirectional interaction loop:

```
server capability → browser action → observable state → dependent counts and views
                         ↑                                  ↓
                         └──────── live socket event ───────┘
```

The system does not maintain a pile of independent button states. It maintains one interaction state and derives the interface from it.

The generic `RT.Actions` controller then handles comments, deletion, privacy changes and private messages across object types. It applies loading state, submits through the shared API path, updates the affected collection and counters, and records analytics.

A listing, an album and an ordinary status therefore speak the same social language without being the same product object.

The design remains elegant. For 2013 browser JavaScript, it was properly ambitious.

## A listing is a post that knows property

The most important domain choice is that a property listing extends the common post model.

It gains comments, likes, subscriptions, privacy, reporting, hiding, deletion, direct messaging, attachments and live counters from the same system used by the social feed. It adds the things only a listing needs:

- sale or rental mode;
- property and location type;
- unit, floor and stack;
- asking price;
- valuation and cash-over-valuation;
- rooms and bathrooms;
- built and land size;
- availability;
- public-address control;
- co-broke notes;
- expiry and renewal;
- cover media and an attachment slideshow.

This is what made RealtAsia a social property network rather than a property portal with a comment widget glued to it.

The interaction model remains general while the listing model carries genuine Singapore property semantics: HDB flat types, private apartments, serviced apartments, landed property categories, master/common room rentals and COV calculations.

## The listing wizard is an application inside the application

The listing form is a six-stage state machine:

1. Location Details
2. Listing Details
3. Finish
4. Media
5. Upload
6. Status

The selected property category changes the valid property types. Sale versus rent changes which fields are required. Landed property can require land size. A valuation can make valuation required. Price and valuation automatically derive COV. Numeric display values accept commas and shorthand such as thousands or millions, then normalise before submission.

Location entry is not a loose address field. The wizard searches the location catalogue, resolves the chosen result to a page, inherits its parent and subtype, and associates the listing with that canonical place. It can keep the precise unit address private while still attaching the listing to the public development or estate.

Media is part of the same workflow. An agent can:

- open the existing media library without leaving the wizard;
- select one or many files from an album;
- choose a cover;
- create an album;
- upload additional files;
- remove selections;
- return to the listing with state preserved.

Editing reconstructs the form from the saved listing, fetches the complete content and attachment objects, restores the location/unit split, and preserves the distinction between saved server values and current edits. Creation inserts the new typed listing back into the live collection and increments the profile’s listing count.

There is optimistic local state, deferred server state, validation, navigation guards, conditional requirements and cross-feature orchestration in one workflow. “Listing wizard” is a modest name. “Small specialised property operating system presented in a modal” would have frightened marketing.

The rapid sequence around September 2013 documents this work, including two identically described commits nine seconds apart:

- [`50b9874`](https://github.com/realtasia/app-rta/commit/50b9874a8b734cc3dabd311e09fd8ce8e4b90973)
- [`a435b28`](https://github.com/realtasia/app-rta/commit/a435b28e2ad78215abc6eb830890eb9ec6ac0057)
- [`6eb0003` — “completed listings and conversations”](https://github.com/realtasia/app-rta/commit/6a9f42d9253303c44ffc767e4993b80fde5ea8bc)

Nine seconds is excellent eventual consistency for Git operated by a human.

## The media library is a complete ingestion pipeline

The phrase “media library” understates the pipeline considerably.

In the browser, albums are observable objects with privacy, name, description, attachment counts, pagination and save state. Album metadata auto-saves when editing ends. The uploader supports HTML5 with Flash, Silverlight and HTML4 fallbacks because 2013 browsers were less a platform than a hostile coalition.

On the PHP side, the media controller:

- accepts multipart or raw-body uploads;
- reassembles chunked files into a temporary `.part`;
- generates a unique filename while retaining the original display name;
- detects MIME type;
- constrains oversized images;
- runs image optimisation;
- makes a square smart crop;
- creates the standard RealtAsia image sizes;
- sharpens and encodes the derivatives;
- batches S3 `PutObject` commands;
- applies one-year public cache headers;
- creates the attachment record through the API;
- remembers a newly created album ID across the remaining uploads.

Documents travel through a parallel path. They are stored in S3, represented as rich attachments and given an embeddable document viewer. Images retain dimensions and MIME metadata. Attachments can later be paged into albums, previewed in a reusable modal or selected into listings.

Avatar handling is a specialised branch of the same pipeline. The user uploads once, crops once, and the server produces all standard sizes. The stored object naming convention is exactly what the “invisible CDN” deployment path later exploits: stable application avatar URLs can resolve the current image and internally hand the actual object to Nginx/S3 delivery.

See:

- [media controller](./application/classes/controller/media.php)
- [media application code](./js/medialib.js)
- [deployment commentary](https://github.com/realtasia/deployment-rta/blob/main/COMMIT_COMMENTARY.md)
- [The Invisible CDN We Built in 2012](https://geekist.co/the-invisible-cdn-we-built-in-2012-for-dynamic-avatars/)

The application, API, database, S3 object layout and Nginx route were designed as one path. This repository contains the intake end of it.

## The feed is a polymorphic live collection

A result collection is not assumed to contain one type. API data is mapped item by item through `CreateLoop`, so the same feed can hold ordinary posts, listings, albums, attachments and testimonials while each retains its own behaviour and template.

The collection logic uses a neat eleven-item convention:

- request eleven;
- display ten;
- if the eleventh exists, there is another page.

The browser removes the sentinel item, sets `hasNextPage`, and re-enables the scroll waypoint after the next page arrives. The same shape appears in feeds, album attachments and conversations.

Search and filtering share an observable `Sorter` model. People, places, feeds and listings provide specialised defaults while using the same reload/append machinery. Listing filters normalise prices, sizes and room counts before sending a structured listing query to the API.

The PHP controllers support the same route in two modes. A normal request renders the initial page; an AJAX request returns JSON. That symmetry is why the application can be indexable and directly addressable while still behaving like a single-page application after load.

## Messaging is another ordered collection, with different time

The conversation subsystem reuses the application’s collection and page-navigation ideas while respecting the awkward direction of message history.

Conversation lists load forward in pages. Messages calculate the missing range from the conversation’s total, request the preceding block, prepend older results and restore the scroll position near the message that had been at the top. New replies append and scroll to the end.

The model also handles:

- participant-aware conversation labels;
- recipient autocomplete;
- new-conversation creation;
- read/unread transitions;
- per-conversation and global unread counts;
- inbox navigation expressed as a small client-side history stack;
- deep links to a conversation through the hash route.

The live channel completes the path. A private-message socket event enters the user’s unread collection and advances the counter. This is the application end of the separate queue/notification/socket architecture, not a standalone chat box that happens to use Socket.IO.

## Sockets merge external events into existing state

The class named `RT.PubSub` connects to the socket service, subscribes to the current user’s channel and adds an administrative subscription for admins.

When an event arrives:

- a private message joins the unread-message collection;
- a comment finds its target in the visible feed, increments the comment count and retrieves the new comment;
- a like increments the corresponding liker count;
- a subscription increments the subscriber count;
- every notification becomes a typed, linked entry in the header collection.

The important detail is the lookup against the object already in `RTApp.cl`. The socket code does not maintain a second real-time universe. It mutates the same models that were hydrated from PHP and subsequently changed by local user actions.

That closes the loop across repositories:

1. an action is accepted by the API;
2. background work enters the queue;
3. notification logic determines recipients and payload;
4. the socket service delivers it;
5. `app-rta` applies it to the object already on screen.

The companion [queue commentary](https://github.com/realtasia/queue-rta/blob/main/COMMIT_COMMENTARY.md) and [socket commentary](https://github.com/realtasia/sockets-rta/blob/main/COMMIT_COMMENTARY.md) describe the middle. This repository proves why those services existed.

The integration arrives visibly in:

> **“Cleaned up views, added markup for sockets and added functionality for sockets. need to clean up sockets”**  
> [`b2e51d9`](https://github.com/realtasia/app-rta/commit/b2e51d9848d74cd1cc7d87237ceee3f3524cdf5b)

The code then chronicles the ordinary misery of making a browser reach a Node service in production: add the client, inspect messages, change the domain, discover the explicit port is not reaching the public route, remove it, continue living.

## Knockout was used as a platform, not a templating trick

The code builds a small application framework around Knockout.

There are custom observable-array operations for:

- inserting a page at the front;
- pushing a page at the end;
- adding only if an object is absent;
- replacing an existing object or adding it.

There is a reusable `PageInterface` with observable history, current-page selection, forward navigation and back navigation. Media and conversations both build their own multi-view experiences on it.

The application defines custom bindings for autocomplete, date display, avatar resolution, maps, scrolling, message-scroll preservation, tooltips, validation state, animated visibility, radio buttons, modal templates, confirmation dialogs and responsive behaviour.

Validation is reactive and sometimes asynchronous. Registration checks username, email and mobile uniqueness after throttled input. Agent registration changes the required fields. Profile editing tracks initial values, supports reversion and saves changed fields. Settings enter an editable transaction and expose whether anything has changed.

Responsive layout is itself observable: the application derives phone, tablet, default and large-screen states from viewport dimensions, then templates and behaviour consume those states. Some complex listing operations are deliberately disabled on mobile when their modal workflow cannot be trusted. That is product judgement, not absence of mobile thought.

Under the period syntax is a substantial client application framework. There are no imports, components or TypeScript types to announce the architecture. The structure is expressed through constructors, prototypes, mappings, computed observables and server-provided capabilities. Knockout observables are doing work that modern stacks distribute among a state manager, query cache, router and at least one conference talk.

## Profiles are working business identities

A user model is role-aware: user, agent and administrator capabilities are derived in the browser from the roles returned by the API. Only agents and admins can publish listings.

Registration and profile editing understand the difference between an ordinary user and a licensed property professional. They handle:

- person and contact information;
- Singapore mobile validation and verification;
- company lookup;
- CEA licence format;
- designation and representative details;
- uniqueness checks;
- password confirmation;
- biographies, languages, education and achievements;
- social links;
- explicit selection of fields exposed in the vCard.

The vCard feature is therefore more thoughtful than “generate a QR code”. A user selects which profile fields may travel. The QR points to a current profile endpoint rather than containing a frozen copy. That endpoint performs its access check and emits a real downloadable vCard.

> **“Finished QRCode VCARD implementation”**  
> [`dcf71af`](https://github.com/realtasia/app-rta/commit/dcf71af9ec5b4de326634031b203f0d82a35d825)

The physical-world hand-off was part of the product model.

## Testimonials are bilateral, moderated social proof

Testimonials are specialised posts with two perspectives:

- **written**: authored by the current person;
- **received**: attached to the current person or page.

The recipient can approve, pend, archive or trash what appears on their profile. The author and recipient views have different meanings and controls. Testimonials still participate in common post ownership and permissions, while their approval lifecycle remains specific.

This is another example of the central design holding: extend the common social object, then add only the domain behaviour that differs.

## Location administration is data curation software

Property search depends on canonical place data. The location administration code does far more than edit a table.

It works through “stray” address records, compares them with SingPost-derived data, searches by postal/name/street, maintains review statuses, distinguishes estates, buildings and child locations, and can apply a resolved location across multiple postal records. Staff can mark records new, successful, needing review or invalid; counts for each work queue remain visible.

The interface can also launch an external search using the available name, street and postal data when the record needs human investigation.

This is a small data-quality operations console. It converts messy external address material into the location hierarchy used by profiles, search and listings. The commit that reduced four count requests to one was optimising a real curation workflow:

> **“Admin locations were sending out 4 requests each time to get counts. Changed to single request.”**  
> [`3d491b1`](https://github.com/realtasia/app-rta/commit/3d491b1ee573ec65d534e9dcb34ac167ebeeec16)

The same error callback also contains:

> “If this keeps happening, call me... I love you Lizzie bb... thanks for all your help...”

Observability was more personal then.

## The sales token joins a room to a registration

The admin console can create two kinds of short code:

- presentation;
- signup.

The active four-character token is displayed as four large individual characters. Administrators can refresh the people attributed to it, delete it, and filter the leads view by all, pending, activity, activations, presentations, signups or the current token.

This creates a bridge from an in-person sales encounter to the online account process. A salesperson can present the service or help someone register using a memorable code; the resulting accounts remain attributable to that session.

The mechanism is tiny. The product thinking is not. It recognises that real-estate acquisition happens in rooms, over phones and during presentations, while the system of record lives online.

## Registration continues through money and activation

The commercial path distinguishes regular members from licensed agents, validates the agent identity, selects a package and constructs the PayPal submission. The application carries its internal identity through the payment request, accepts IPN status updates, renders pending/success/cancellation states, creates billing records and triggers account-created and activation mail.

The PayPal protocol implementation uses a credited Kohana IPN module. The surrounding product transaction is RealtAsia’s: registration, package choice, account state, dates, payment identity, subscription behaviour and user communication.

Its commit history is flawless documentary cinema:

> **“Fixed IPN Pending… Fixed remove paypal sandbox mode”**  
> [`d05aeaa`](https://github.com/realtasia/app-rta/commit/d05aeaac8640e7bc4d7060acb5890ac8470ce89c)

> **“Forgot to remove sandbox for paypal”**  
> [`c30042a`](https://github.com/realtasia/app-rta/commit/c30042a269dcb3a736eec78744eb232448bbcdeb)

> **“Still in sandboxgit add .”**  
> [`197f1c4`](https://github.com/realtasia/app-rta/commit/197f1c433f1904b13b67bc146bc33a907dcc4f79)

Shakespeare had fewer deployment environments.

## The application understood sharing and discovery

The PHP metadata builder knows the difference between a profile, company, place, ordinary post, album, image, testimonial and listing.

Listings receive a custom `realtasia:listing` Open Graph type, a relationship to their location and geographic coordinates when available. Albums expose their images. Profiles expose the selected avatar and description. Testimonials relate to the relevant person or location. Pages and directories receive their own titles and descriptions.

This matters because a social property system does not end at its own interface. Shared links must carry enough structure to make sense when they leave the site.

The application also instrumented meaningful user actions: comments, deletion, privacy changes and hover-card views were sent to analytics with the relevant user and object identity. That is product measurement embedded in the domain actions, rather than page-view confetti.

## The commit history is funnier because the code is serious

A few favourites survive because they describe the reality around the architecture:

> **“Only changed a line or 2 but the git clone somehow changed more”**  
> [`09bc869`](https://github.com/realtasia/app-rta/commit/09bc8698964f5e67e447fac27e2b68ebc3f65b86)

> **“Weird pull got in formerly deleted images and unused files. Had to delete them manually again”**  
> [`c1f6455`](https://github.com/realtasia/app-rta/commit/c1f64556f18ec6c74b70237e293e39ef01c613d2)

> **“Committed final design changes.”**  
> [`6a8fdc1`](https://github.com/realtasia/app-rta/commit/6a8fdc19afb3ad67c12b64f0b673575d4102ccb3)

Two days later:

> **“Design was seriously messed up when CSS was processed. Reverted to a simple combine of CSS files.”**  
> [`1324cd3`](https://github.com/realtasia/app-rta/commit/1324cd31fe785fa037f64e1ff79f68aacda39e73)

And the first version of the new sales page temporarily advertised backlinks, SEO reports and a “Site Explorer Platform” inside a Singapore property network:

> **“Testing new sales page”**  
> [`49f393b`](https://github.com/realtasia/app-rta/commit/49f393b54ce459742197bd61b175411ee156c3f6)

The differentiated application was handwritten. The pricing layout arrived with a previous life and had to be exorcised.

## The architectural centre

The source carries the signatures of its era: large files, global namespaces, prototype wiring, compiled dependencies committed to source, modal-heavy workflows and terse variable names. Those implementation details surround a coherent architectural centre.

That centre is the resource object returned by the API: identity, type, state, permissions, actions, relationships and counts. PHP can render it. Knockout can hydrate it. Generic JavaScript can act on it. Specialised models can extend it. The feed can mix it with other types. The queue can describe an event concerning it. Sockets can find it in memory and update it.

Around that centre, `app-rta` built:

- a hybrid server/client application;
- an API-driven capability model;
- a polymorphic social feed;
- reactive, bidirectional interactions;
- a serious property-listing state machine;
- a media ingestion and delivery pipeline;
- conversations with ordered pagination and unread state;
- real-time reconciliation;
- professional profiles and portable vCards;
- bilateral testimonials;
- canonical location-data operations;
- physical-to-digital sales attribution;
- paid registration and activation;
- structured social metadata and analytics.

`app-rta` is the integration point where RealtAsia’s separate services become one coherent product.
