# ELEVEN Frontend Developer Coding Assessment

## Objective
The goal of this assessment is for developer candidates to demonstrate their skills, primarily 
pertaining to TypeScript and SCSS.

## Assumptions
We primarily deal with infrastructure on Linux-based systems, so this assessment assumes that the 
developer has at least a basic knowledge of the Linux command line, and has a compatible development 
environment. This could be Linux, Mac OS, or WSL on Windows.

The assessment is set up to run in a set of Docker containers, in a similar fashion to how most 
ELEVEN projects are structured. It is assumed that the developer has experience with Docker Compose 
and has a working Docker environment.

## Setup
To get started, you'll need to clone the repository.

```shell
# Via SSH
git clone git@github.com:elevensolutions/frontend-dev-assessment.git

# Or via HTTPS
git clone https://github.com/elevensolutions/frontend-dev-assessment.git
```

Next, run the `init` script to set up a `.env` file and download the Docker and Node dependencies. 
You will need Docker installed before running the script.

```shell
cd frontend-dev-assessment
./init
```

If there were no errors, you should be ready to start coding.

## Local Build Environment
The local environment runs in a set of 3 containers via the [`docker-compose.yml`](docker-compose.yml) file:
- `client` - Compiles and Webpacks the client TypeScript files into JavaScript, and watches for changes.
- `scss` - Compiles the SCSS files into CSS, and watches for changes.
- `nginx` - Runs a minimal local web server, which serves the content via http://localhost:8080/. 
  Port may be changed in the `.env` file.

\
Start the local environment, logging to the terminal window.

```shell
docker compose up
```

\
You should be able to complete your tasks by editing and creating files in 
[`client/src`](client/src) and [`scss/src`](scss/src).

## Assignment
The project simulates a registry of pilots in a fictional air squadron. Your assignment is to load 
a list of pilots from a mock API, display a searchable dropdown list of the pilots, and display an 
ID card for the pilot when selected.

You must complete the tasks below without using any external frameworks or libraries. You will have 
to write TypeScript and SCSS to accomplish this. You may also edit the [`index.html`](index.html) 
file if desired.

### Tasks
1. Load the list of pilot information via `HTTP GET` request from the mock API endpoint [`/api/pilots.json`](api/pilots.json).
   - Define an interface for the API data.
   - Load the data via an asynchronous method in the `App` class.
   - Save the data to an array property in the `App` class.

2. Complete development of the `Search` class, which represents a searchable dropdown of the pilots.
   - The field has already been created as an `input` element, but it is up to you to convert it 
     into a usable dropdown field.
   - When clicking or focusing the field, a list of all the pilots names should appear, sorted by 
     last name.
   - When clicking or tabbing outside the field, it should collapse.
   - While typing into the field, the list should filter automatically.
   - The list should scroll internally if it is too long to fully appear on the screen.
   - When selecting a pilot, the field should collapse and the search input should be replaced with 
     the selected pilot's name until the field is opened again.

3. Display the ID card when a name is selected. It is up to you how to accomplish this.
   - The containing `div` element and a "photo" have been created for you. Do not worry about doing 
     anything with the photo.
   - The card is hidden unless the `active` class is applied to it (see [`_card.scss`](scss/src/_card.scss)).
   - You must add all of the pilot's information to the card (name, serial number, callsign).

### Guidelines
- Use type annotations liberally and avoid using the `any` type.
- Keep things object-oriented. Create more classes if it helps with organization. Don't hold back on 
  adding properties and methods to your classes.
- Engineer with the assumption that the project will be extended with additional features.
- Take your time. Readable, scalable, well-organized, quality code > speed.
