
# eTicket

Projet créé dans le cadre du Challenge S2 - ESGI 5A.

Solution à destination des commerçants, afin de proposer un ticket de caisse dématérialisé via un QR Code, au lieu d'imprimer un ticket.

### Technos utilisées

- React
- NestJS / Microservices

### Lancer le projet

<code>
docker-compose up -d
</code>

Si le container <code>e-ticket-front</code> ne se lance pas : 

- <code>docker-compose run -it e-ticket-front sh</code>
- <code>npm install</code>
- <code>exit</code>
- <code>docker-compose up -d</code>

### Commandes utiles

- Accéder à un container : <code>docker-compose exec -it <nom_du_container></code>
