<div align="center">

<img src="https://raw.githubusercontent.com/realtasia/.github/main/profile/assets/realtasia-orange-card.png" alt="Original realTasia orange wordmark" width="360">

# app-rta

**The application where six repositories became one product.**

[System archive](https://github.com/realtasia) · [Annotated history](./COMMIT_COMMENTARY.md) · [Sanitisation record](./SANITISATION.md) · [Archive policy](https://github.com/realtasia/.github/blob/main/ARCHIVE_POLICY.md) · [Publication log](https://github.com/realtasia/.github/blob/main/ARCHIVE_LOG.md)

</div>

`app-rta` is the largest part of realTasia. The API owns resources and permissions. The queue moves work away from the request. Shared code materialises feeds and notifications. The socket service delivers live events. Deployment puts the machinery on the internet.

This repository binds those pieces into the thing people actually used.

PHP renders the opening position. A substantial Knockout application then takes over: typed client models, observable state, capability-driven actions, asynchronous navigation, search, pagination, media, conversations, registration, billing, administration, live events and a six-stage property-listing editor.

The spelling of `dependancies.js` is questionable. Its contents are distressingly serious.

## Place in the system

<img src="https://raw.githubusercontent.com/realtasia/.github/main/profile/assets/system-map.svg" alt="Architecture map of the six realTasia repositories" width="640">

`app-rta` is both the browser application and the integration point. It consumes the API, reflects asynchronous work returned through notifications and sockets, and supplies the media-ingestion end of infrastructure that finishes in S3 and Nginx.

The diagram is modern documentation. The architecture it describes is historical.

## What is here

- a hybrid PHP and JavaScript application;
- a browser-side object system built around Knockout observables;
- API responses carrying actions, connections, counts and permissions;
- polymorphic feeds containing posts, listings, albums, attachments and testimonials;
- bidirectional likes and subscriptions;
- conversations with ordered pagination and unread state;
- live reconciliation of comments, likes, subscriptions, messages and notifications;
- professional profiles, companies, places and portable vCards;
- bilateral, moderated testimonials;
- canonical Singapore property-location workflows;
- a six-stage listing editor with genuine domain rules;
- chunked uploads, image derivatives, albums and S3-backed media;
- physical-to-digital salesperson attribution through short tokens;
- paid agent registration and PayPal IPN processing;
- structured Open Graph metadata and product analytics;
- administration tools for location curation and product operations.

## The browser has a domain model

The central JavaScript mechanism is `RTC.CreateLoop`. It examines the `type` returned by the API and constructs the appropriate client object. Posts, listings, albums, attachments, testimonials and conversations enter the browser as different models while retaining a shared interaction grammar.

The common mapper turns server payloads into observable structures:

- `actions`: operations available to the current viewer;
- `connections`: related resources and their URLs;
- `counts`: likes, subscribers, comments and attachments;
- nested comments and attachments as typed models.

The API therefore returns more than records. It tells the browser what each object can do, what it is connected to and where the permitted operations live. The client renders those capabilities rather than inventing a separate permission universe.

A like changes the observable interaction state. Counts and previews follow. A socket event arriving later finds the same object already in memory and changes it again. Local action and remote consequence meet in one model.

That bidirectional loop is the architectural centre of the application.

## A listing is a social object

A property listing extends the common post model. It inherits comments, likes, subscriptions, privacy, reporting, messaging, attachments and live counters, then adds the property domain:

- sale or rental mode;
- property and location type;
- unit, floor and stack;
- price, valuation and cash-over-valuation;
- rooms, bathrooms, built size and land size;
- availability, public-address control and co-broke notes;
- expiry, renewal, cover media and slideshow attachments.

This is what made realTasia a social property network rather than a property portal with comments glued to it.

The listing editor is a six-stage state machine covering location, property details, completion, media, upload and publication status. It changes its valid fields and requirements according to property category, sale versus rent, land type and valuation state. It normalises shorthand prices, derives COV and preserves unsaved media and navigation state across the workflow.

“Listing wizard” is a modest name. “Small specialised property operating system presented in a modal” would have frightened marketing.

## Media is a pipeline

The browser manages observable albums, privacy, metadata, paging, selection and uploads. The PHP controller accepts multipart or raw-body input, reassembles chunks, detects MIME type, constrains images, produces square crops and standard derivatives, optimises them, batches S3 uploads, applies cache headers and creates the corresponding API attachment.

Avatar uploads are a specialised branch of the same path. Their stable public URLs are resolved by the deployment layer into the current S3 object, the mechanism described in [The Invisible CDN We Built in 2012 for Dynamic Avatars](https://geekist.co/the-invisible-cdn-we-built-in-2012-for-dynamic-avatars/).

## Live events return to the object already on screen

The application subscribes the current user to the socket service. Incoming private messages update unread collections. Comments locate their visible target, increment its count and retrieve the new object. Likes and subscriptions update their corresponding counters. Notifications become typed, linked header entries.

The socket code does not create a second real-time universe. It mutates the same models hydrated from PHP and changed by local actions.

The complete loop crosses the repository boundary:

1. `api-rta` accepts an action;
2. `queue-rta` processes its asynchronous consequences;
3. `common-rta` materialises feed and notification state;
4. `sockets-rta` delivers the live event;
5. `app-rta` applies it to the object already in memory.

## Commentary across the system

Every repository carries archival commit commentary. These are modern technical readings of the historical source, linked to the corresponding public commits.

- [`app-rta` commentary](https://github.com/realtasia/app-rta/blob/main/COMMIT_COMMENTARY.md)
- [`api-rta` commentary](https://github.com/realtasia/api-rta/blob/main/COMMIT_COMMENTARY.md)
- [`common-rta` commentary](https://github.com/realtasia/common-rta/blob/main/COMMIT_COMMENTARY.md)
- [`queue-rta` commentary](https://github.com/realtasia/queue-rta/blob/main/COMMIT_COMMENTARY.md)
- [`sockets-rta` commentary](https://github.com/realtasia/sockets-rta/blob/main/COMMIT_COMMENTARY.md)
- [`deployment-rta` commentary](https://github.com/realtasia/deployment-rta/blob/main/COMMIT_COMMENTARY.md)

The [full `app-rta` commentary](./COMMIT_COMMENTARY.md) follows the application from PHP bootstrap through its JavaScript object system, listing state machine, media pipeline, feeds, messaging, sockets, professional identity, location curation, sales attribution, payments and deployment-era comedy.

## Reading the source

Useful starting points:

- [application shell](./application/views/template.php)
- [JavaScript application root](./js/app.js)
- [shared browser models and behaviours](./js/dependancies.js)
- [media application](./js/medialib.js)
- [listing workflow](./js/listing.js)
- [conversation application](./js/conversations.js)
- [PHP API client](./application/classes/api.php)
- [API response and token handling](./application/classes/api/response.php)
- [media controller](./application/classes/controller/media.php)

The implementation carries the signatures of its era: global namespaces, constructor functions, prototype wiring, committed browser dependencies, modal-heavy workflows and terse variable names. Beneath them is a coherent resource architecture joining identity, type, state, permissions, actions, relationships and counts.

## Historical record

The source is presented as period code. Modern documentation identifies itself as modern. The current snapshot has been sanitised as described in the archive policy. The historical commits are also preserved.

The defects remain. So do the commit messages.

> “Design was seriously messed up when CSS was processed. Reverted to a simple combine of CSS files.”

> “Forgot to remove sandbox for paypal”

> “Still in sandboxgit add .”

Shakespeare had fewer deployment environments.

---

Part of the [realTasia source archive](https://github.com/realtasia). Original engineering by [Jason Nathan](https://github.com/pipewrk).

## Rights and reuse

This repository is published as a historical source archive. No open-source licence is granted. Historical third-party notices continue to apply to the material they cover; all other rights are reserved unless a file states otherwise.

## Historical record

This repository contains historical commits with detected credential values redacted, alongside the modern archival snapshot. See [SANITISATION.md](./SANITISATION.md) for the snapshot changes.
