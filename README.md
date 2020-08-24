# lets-hang-out

The project is split into server and client folders.

To run the server, first go into the server folder and install all dependencies with `pip install -r requirements.txt`, then go into matcher and run `export FLASK_APP=__init__.py`, and `export FLASK_ENV=development` (since it is in development still). Lastly, call `flask run`. Note that the server assumes that you are on the appropriate Zillow network for the scrapper to run correctly.

To run the client, first go into the client folder install all dependenciies with `npm install`, then run `npm start`.