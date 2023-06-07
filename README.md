# Ecomerce-Test-Application
This is a test application given by JS Encoder

All 3 key feature given by JS Encoder have been implemented - 
a. First, you need to upload a photo of the product. After uploading, you will receive a
response from the backend. And update the image attribute of the request body.
b. From the response, you must extract the "id" and "image_id" values to use in the
"variants" field.
C. Adding a variant needs to be done with separate API you can find it on the
provided postman collection inside the Backend repository.

Before checking these features you have to
- install all the dependencies in the backend
- install all the dependencies in the frontend
- Run the backend project using docker compose 

```bash
docker-compose up --build 
```

it will run the backend in port 9001
