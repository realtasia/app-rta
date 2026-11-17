# app-rta sanitisation record

This is modern editorial material for the 2026 realTasia archive.

## Publication model

The public repository preserves the historical master-branch commit sequence, messages, dates and authors, with detected credential values redacted from file contents. The untouched private `pipewrk/app-rta` repository remains the archival master. The snapshot changes are described separately below.

GitHub continued to serve superseded commits by SHA after this rewrite. Removing those cached views requires separate GitHub cleanup.

## Historical credential redactions

Detected application access-token and API-key values were replaced with explicit redaction markers throughout the public history. The surrounding files, commit sequence and commit metadata remain. The following commits introduced or changed detected values. The first identifier refers to the private source; the link opens the rewritten public commit. Later commit IDs may also differ because their ancestry changed.

| Original commit | Public commit | Original message |
|---|---|---|
| `a1d8ac7` | [`5507b8b`](https://github.com/realtasia/app-rta/commit/5507b8b2b2c2548f1c4b43a4cadaecefd2a99723) | Removed weird unwanted stuff from repo |
| `992e5f7` | [`569103d`](https://github.com/realtasia/app-rta/commit/569103d8245c3179581239a43bfe2001d477d23f) | Fixed bugs with admin locations, cleaned up js and styles. Testing new header nav |
| `4ccd775` | [`50b9874`](https://github.com/realtasia/app-rta/commit/50b9874a8b734cc3dabd311e09fd8ce8e4b90973) | Fixed listing keywords, creation The last thing now is to add editing to listings. Also need to work on the listings cron. Also listings creation needs some basic validation. Updated messaging functionality, Updated styles and markup |

Affected paths:

- `application/classes/controller/person.php`
- `application/views/template-new-slide-bete.php`
- `application/views/template.php`

## Snapshot changes

| Category | Treatment | Reason | Behavioural effect |
|---|---|---|---|
| Authentication, encryption, Facebook, MongoDB and session configuration | Operational values replaced with clearly synthetic values | Credentials and private runtime configuration do not belong in the public archive | Integrations require new configuration |
| Embedded browser and service integration values | Private endpoints, identifiers and credential-shaped literals replaced with synthetic values | Historical client bundles contained deployable operating details | Affected integrations are illustrative only |
| Registration, user-loop, test and media-library examples | Confirmed personal or operational literals replaced with synthetic values | Real people and private operating details are not part of the artefact | Schemas and control flow remain; examples are synthetic |
| IDE metadata, backup configuration and Picasa cache/original directories | Omitted from the snapshot | Incidental metadata and duplicate imagery add privacy and rights risk without architectural value | No executable-source effect |

`COMMIT_COMMENTARY.md` is contemporary analysis. Its links point to the corresponding public historical commits.

## Rights

No open-source licence is granted for this repository as a whole. Historical third-party notices continue to govern the files they cover. All other rights are reserved.
