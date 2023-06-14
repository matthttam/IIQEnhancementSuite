# IIQ Enhancement Suite
This chrome extension aims to add additional functionality to IncidentIQ. Simply install and refresh your *.incidentiq.com webpage. Check options to enable/disable features.

## Disclaimer
I am an independent developer and I am not affiliated in any way with incidentIQ, Incident IQ, LLC, or any affiliates thereof.

## Features
### Assets
- Adds a copy button for the asset and serial
### RapidScan
- Adds sounds to RapidScan
### Batch Check In
- Auto focus the device field after scanning storage box
### Administration > Issues > Models
- Hide unused categories of issues and unused resolution actions when configuring these options. A toggle button is present to show the unused options.
## Version History
### 1.1.7
- Fixed Issue 10 - Issue hiding hides on other issue tabs
- Allows issue filtering for all issue tabs, not just model issues.
- Correctly handles when the model issue list or the resolution action list uses the search feature
- Refactored to improve efficiency and readability
### 1.1.6
- Fixed Issue 8 - Copy links not loading
- Refactored code to prevent namespace collisions between content scripts
### 1.1.5
- Fixed Issue 6 - Batch Check In focuses device box early if manually typing in
- Fixed Issue 5 - Options not saving
- Fixed Issue 4 - Loading an Asset Twice May Cause Duplicate Copy Buttons
- Refactored code to work more efficiently
### 1.1.4
- Fixed an error caused by improperly importing the config file in the options page.
### 1.1.3
- Added auto focus student box during batch check out.
- Default options now apply properly fixing a bug where features wouldn't work until you saved options once.
### 1.1.2
- Fixed file paths so the sounds work again.
### 1.1.1
- Added icons
- Fixed a bug that prevented features from working.
### 1.1.0
- Added copy button functionality
- Added Options page to allow users to disable features they don't want
- Organized code and files into a better structure
- Updated Readme
- Changed name from IIQ RapidScan Sounds to IIQ Enhancement Suite
### 1.0.2
- Initial Release