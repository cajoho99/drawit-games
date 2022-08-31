# Create T3 App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.


To run this website, rename `.env-example` to `.env` and fill in the relevant details.
Contact håll if you want the client id and secret for the gamma instance. 

Start the docker container for the db by running `docker compose up -d`

Push the db schema to the database by running `npx prisma db push`

Start the site by running `npm run dev`

Contact me if you have issues.
