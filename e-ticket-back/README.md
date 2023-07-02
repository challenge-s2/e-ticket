## Lancement du projet

<code>docker compose up</code>

## Application

Il s'agit d'une application permettant de générer des tickets de caisse directement sur internet. Le client peut accéder à son ticket en scannant un qrCode

## Routes

#### AUTH

POST "/login/"

#### USER

POST "/users/"

GET "/users/"

GET "/users/:id"

#### COMPANY

POST "/company/"

GET "/company/" => Get all companies

GET "/company/:id" => Get one company by ID

GET "/company/user/:userId" => Get company associated with one user

PATCH "/company/:id" => Edit company

DELETE "/company/:id" => Delete company

#### PRODUCTS

POST "/products"

GET "/products" => Get all products

GET "/products/:id" => Get product by ID

GET "/products/company/:companyId" => Get all products for a company

DELETE "/products/:id" => Delete a company

#### TICKET

POST "/ticket/"

GET "/ticket/" => Get all tickets

GET "/ticket/company/:companyId" => Get all tickets for a company

GET "/ticket/:companyId" => Get the last ticket for a company

DELETE "/ticket/:id" => Delete a ticket

## Précisions

- L'application est développée en micro-services
- L'authentification est fonctionnelle
- Les guards ont étés développés, mais ne fonctionnent pas (impossible de savoir pourquoi)
- Un front est disponible à l'adresse localhost:3010
- Une gestion des rôles a été intégrée, avec un décorateur @Roles(), mais étant donné que les guards ne fonctionnent pas, la vérification de role non plus.
