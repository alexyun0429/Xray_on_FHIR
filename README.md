# X-RAY on FHIR

This project is made with FHIR API, Meld SMART Launcher and React.js to display X-RAY images of a hand fracture, then run an AI pipeline to find out if the fracture is intra-articular or extra-articular. Then, the conclusion is shown, and heatmaps generated from the AI pipeline are shown to the user.
(NOTE: for a security purpose, I have removed AI pipeline url)

## Run application

To run the application, you first need to run `npm install`. Then the Meld sandbox needs to be launched before `npm run start` in the terminal to run the react application.

## Technology

### Meld SMART Launcher

This project uses Meld, more specifically, a specialized FHIR sandbox where the default patients are edited to contain a procedure of an X-ray exam on hand and the Dropbox links to the X-ray pictures are also stored here. The Meld Sandbox uses FHIR version: FHIR R4 (v4.0.1) and HAPI FHIR Server:5.2.0. To run the app, the Meld Sandbox must be launched with the default practioner and no patient.
https://meld.interop.community/

### FHIR API

An FHIR server is launched through the Meld, and the client provides an access token with the scope: launch/patient/\*.cruds open ID profile (which is set in the Meld sandbox settings). The FHIR-API is used to retrieve the patients through the [GET /Patient](https://build.fhir.org/patient-definitions.html) and the patient's procedures for the selected patient [GET /Procedure?Patient={patientId}](https://fhir-ru.github.io/procedure.html#:~:text=Procedure%20is%20one%20of%20the,of%20the%20provision%20of%20care).

### REACT.js

The project is made in REACT.js to display the information and have the user interact with the page.

### Acknowledgment

The project was built with Thea, Selma, Tord, Elin, and Emilie, with CSIRO mentors.
