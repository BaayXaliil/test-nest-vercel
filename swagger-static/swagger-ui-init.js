
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/": {
        "get": {
          "operationId": "AppController_getHello",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "App"
          ]
        }
      },
      "/auth/register": {
        "post": {
          "operationId": "AuthController_register",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegisterDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Utilisateur créé avec succès"
            },
            "400": {
              "description": "Données invalides"
            }
          },
          "summary": "Inscription d'un nouvel utilisateur",
          "tags": [
            "Authentification"
          ]
        }
      },
      "/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Connexion réussie"
            },
            "401": {
              "description": "Non autorisé"
            }
          },
          "summary": "Connexion utilisateur",
          "tags": [
            "Authentification"
          ]
        }
      },
      "/users": {
        "post": {
          "operationId": "UsersController_create",
          "parameters": [],
          "responses": {
            "201": {
              "description": "Utilisateur créé avec succès"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Créer un nouvel utilisateur",
          "tags": [
            "Utilisateurs"
          ]
        },
        "get": {
          "operationId": "UsersController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Liste des utilisateurs récupérée"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer tous les utilisateurs",
          "tags": [
            "Utilisateurs"
          ]
        }
      },
      "/users/{id}": {
        "get": {
          "operationId": "UsersController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Utilisateur récupéré"
            },
            "404": {
              "description": "Utilisateur non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer un utilisateur par son ID",
          "tags": [
            "Utilisateurs"
          ]
        },
        "patch": {
          "operationId": "UsersController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Utilisateur mis à jour"
            },
            "404": {
              "description": "Utilisateur non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Mettre à jour un utilisateur",
          "tags": [
            "Utilisateurs"
          ]
        },
        "delete": {
          "operationId": "UsersController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Utilisateur supprimé"
            },
            "404": {
              "description": "Utilisateur non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Supprimer un utilisateur",
          "tags": [
            "Utilisateurs"
          ]
        }
      },
      "/users/role/{role}": {
        "get": {
          "operationId": "UsersController_findByRole",
          "parameters": [
            {
              "name": "role",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Utilisateurs récupérés par rôle"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer les utilisateurs par rôle",
          "tags": [
            "Utilisateurs"
          ]
        }
      },
      "/users/{id}/preferences": {
        "patch": {
          "operationId": "UsersController_updatePreferences",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Préférences mises à jour"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Mettre à jour les préférences d'un utilisateur",
          "tags": [
            "Utilisateurs"
          ]
        }
      },
      "/users/{id}/change-password": {
        "patch": {
          "operationId": "UsersController_changePassword",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Mot de passe changé avec succès"
            },
            "400": {
              "description": "Ancien mot de passe incorrect"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Changer le mot de passe d'un utilisateur",
          "tags": [
            "Utilisateurs"
          ]
        }
      },
      "/etablissements": {
        "post": {
          "operationId": "EtablissementsController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateEtablissementDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Créer un nouvel établissement",
          "tags": [
            "Établissements"
          ]
        },
        "get": {
          "operationId": "EtablissementsController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer tous les établissements",
          "tags": [
            "Établissements"
          ]
        }
      },
      "/etablissements/{id}": {
        "get": {
          "operationId": "EtablissementsController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer un établissement par son ID",
          "tags": [
            "Établissements"
          ]
        },
        "patch": {
          "operationId": "EtablissementsController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateEtablissementDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Mettre à jour un établissement",
          "tags": [
            "Établissements"
          ]
        },
        "delete": {
          "operationId": "EtablissementsController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Supprimer un établissement",
          "tags": [
            "Établissements"
          ]
        }
      },
      "/reservations": {
        "post": {
          "operationId": "ReservationsController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateReservationDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Créer une nouvelle réservation",
          "tags": [
            "Réservations"
          ]
        },
        "get": {
          "operationId": "ReservationsController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer toutes les réservations",
          "tags": [
            "Réservations"
          ]
        }
      },
      "/reservations/client/{clientId}": {
        "get": {
          "operationId": "ReservationsController_findByClient",
          "parameters": [
            {
              "name": "clientId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer les réservations d'un client",
          "tags": [
            "Réservations"
          ]
        }
      },
      "/reservations/etablissement/{etablissementId}": {
        "get": {
          "operationId": "ReservationsController_findByEtablissement",
          "parameters": [
            {
              "name": "etablissementId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer les réservations d'un établissement",
          "tags": [
            "Réservations"
          ]
        }
      },
      "/reservations/{id}": {
        "get": {
          "operationId": "ReservationsController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer une réservation par son ID",
          "tags": [
            "Réservations"
          ]
        },
        "patch": {
          "operationId": "ReservationsController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateReservationDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Mettre à jour une réservation",
          "tags": [
            "Réservations"
          ]
        },
        "delete": {
          "operationId": "ReservationsController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Supprimer une réservation",
          "tags": [
            "Réservations"
          ]
        }
      },
      "/services": {
        "post": {
          "operationId": "ServicesController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateServiceDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Service créé avec succès"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Créer un nouveau service",
          "tags": [
            "Services"
          ]
        },
        "get": {
          "operationId": "ServicesController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Liste des services récupérée"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer tous les services",
          "tags": [
            "Services"
          ]
        }
      },
      "/services/etablissement/{id}": {
        "get": {
          "operationId": "ServicesController_findByEtablissement",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Services de l'établissement récupérés"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer les services d'un établissement",
          "tags": [
            "Services"
          ]
        }
      },
      "/services/categorie/{categorie}": {
        "get": {
          "operationId": "ServicesController_findByCategorie",
          "parameters": [
            {
              "name": "categorie",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Services de la catégorie récupérés"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer les services par catégorie",
          "tags": [
            "Services"
          ]
        }
      },
      "/services/{id}": {
        "get": {
          "operationId": "ServicesController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Service récupéré"
            },
            "404": {
              "description": "Service non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer un service par son ID",
          "tags": [
            "Services"
          ]
        },
        "patch": {
          "operationId": "ServicesController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateServiceDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Service mis à jour"
            },
            "404": {
              "description": "Service non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Mettre à jour un service",
          "tags": [
            "Services"
          ]
        },
        "delete": {
          "operationId": "ServicesController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Service supprimé"
            },
            "404": {
              "description": "Service non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Supprimer un service",
          "tags": [
            "Services"
          ]
        }
      },
      "/services/{id}/disponibilite": {
        "patch": {
          "operationId": "ServicesController_updateDisponibilite",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Disponibilité mise à jour"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Mettre à jour la disponibilité d'un service",
          "tags": [
            "Services"
          ]
        }
      },
      "/services/{id}/prix": {
        "patch": {
          "operationId": "ServicesController_updatePrix",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Prix mis à jour"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Mettre à jour le prix d'un service",
          "tags": [
            "Services"
          ]
        }
      }
    },
    "info": {
      "title": "API E-Teral",
      "description": "Documentation API de la plateforme E-Teral",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "RegisterDto": {
          "type": "object",
          "properties": {
            "nom": {
              "type": "string",
              "description": "Nom de l'utilisateur"
            },
            "prenom": {
              "type": "string",
              "description": "Prénom de l'utilisateur"
            },
            "email": {
              "type": "string",
              "description": "Email de l'utilisateur"
            },
            "password": {
              "type": "string",
              "description": "Mot de passe de l'utilisateur"
            },
            "role": {
              "type": "string",
              "description": "Rôle de l'utilisateur",
              "enum": [
                "ADMIN",
                "ETABLISSEMENT",
                "CLIENT"
              ]
            },
            "telephone": {
              "type": "string",
              "description": "Numéro de téléphone"
            }
          },
          "required": [
            "nom",
            "prenom",
            "email",
            "password",
            "role"
          ]
        },
        "LoginDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "Email de l'utilisateur"
            },
            "password": {
              "type": "string",
              "description": "Mot de passe de l'utilisateur"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "CreateEtablissementDto": {
          "type": "object",
          "properties": {
            "nom": {
              "type": "string",
              "description": "Nom de l'établissement"
            },
            "type": {
              "type": "string",
              "description": "Type d'établissement (hôtel, restaurant, etc.)"
            },
            "adresse": {
              "type": "string",
              "description": "Adresse de l'établissement"
            },
            "description": {
              "type": "string",
              "description": "Description de l'établissement"
            },
            "telephone": {
              "type": "string",
              "description": "Numéro de téléphone"
            },
            "email": {
              "type": "string",
              "description": "Adresse email"
            },
            "siteWeb": {
              "type": "string",
              "description": "Site web"
            },
            "images": {
              "description": "Images de l'établissement",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "proprietaire": {
              "type": "string",
              "description": "ID du propriétaire"
            },
            "localisation": {
              "type": "object",
              "description": "Localisation"
            },
            "horaires": {
              "type": "object",
              "description": "Horaires d'ouverture"
            },
            "services": {
              "description": "Services proposés",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "actif": {
              "type": "boolean",
              "description": "État actif de l'établissement"
            },
            "configuration": {
              "type": "object",
              "description": "Configuration de l'établissement"
            }
          },
          "required": [
            "nom",
            "type",
            "adresse",
            "proprietaire"
          ]
        },
        "UpdateEtablissementDto": {
          "type": "object",
          "properties": {
            "nom": {
              "type": "string",
              "description": "Nom de l'établissement"
            },
            "type": {
              "type": "string",
              "description": "Type d'établissement (hôtel, restaurant, etc.)"
            },
            "adresse": {
              "type": "string",
              "description": "Adresse de l'établissement"
            },
            "description": {
              "type": "string",
              "description": "Description de l'établissement"
            },
            "telephone": {
              "type": "string",
              "description": "Numéro de téléphone"
            },
            "email": {
              "type": "string",
              "description": "Adresse email"
            },
            "siteWeb": {
              "type": "string",
              "description": "Site web"
            },
            "images": {
              "description": "Images de l'établissement",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "proprietaire": {
              "type": "string",
              "description": "ID du propriétaire"
            },
            "localisation": {
              "type": "object",
              "description": "Localisation"
            },
            "horaires": {
              "type": "object",
              "description": "Horaires d'ouverture"
            },
            "services": {
              "description": "Services proposés",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "actif": {
              "type": "boolean",
              "description": "État actif de l'établissement"
            },
            "configuration": {
              "type": "object",
              "description": "Configuration de l'établissement"
            }
          }
        },
        "CreateReservationDto": {
          "type": "object",
          "properties": {
            "client": {
              "type": "string",
              "description": "ID du client"
            },
            "etablissement": {
              "type": "string",
              "description": "ID de l'établissement"
            },
            "dateDebut": {
              "format": "date-time",
              "type": "string",
              "description": "Date de début de la réservation"
            },
            "dateFin": {
              "format": "date-time",
              "type": "string",
              "description": "Date de fin de la réservation"
            },
            "nombrePersonnes": {
              "type": "number",
              "description": "Nombre de personnes"
            },
            "services": {
              "description": "Services réservés",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "prixTotal": {
              "type": "number",
              "description": "Prix total de la réservation"
            },
            "statut": {
              "type": "string",
              "description": "Statut de la réservation",
              "enum": [
                "EN_ATTENTE",
                "CONFIRMEE",
                "ANNULEE",
                "TERMINEE"
              ]
            },
            "paiement": {
              "type": "object",
              "description": "Informations de paiement"
            },
            "commentaires": {
              "type": "string",
              "description": "Commentaires"
            },
            "checkIn": {
              "type": "object",
              "description": "Informations de check-in"
            },
            "checkOut": {
              "type": "object",
              "description": "Informations de check-out"
            }
          },
          "required": [
            "client",
            "etablissement",
            "dateDebut",
            "dateFin",
            "nombrePersonnes",
            "prixTotal",
            "statut"
          ]
        },
        "UpdateReservationDto": {
          "type": "object",
          "properties": {
            "client": {
              "type": "string",
              "description": "ID du client"
            },
            "etablissement": {
              "type": "string",
              "description": "ID de l'établissement"
            },
            "dateDebut": {
              "format": "date-time",
              "type": "string",
              "description": "Date de début de la réservation"
            },
            "dateFin": {
              "format": "date-time",
              "type": "string",
              "description": "Date de fin de la réservation"
            },
            "nombrePersonnes": {
              "type": "number",
              "description": "Nombre de personnes"
            },
            "services": {
              "description": "Services réservés",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "prixTotal": {
              "type": "number",
              "description": "Prix total de la réservation"
            },
            "statut": {
              "type": "string",
              "description": "Statut de la réservation",
              "enum": [
                "EN_ATTENTE",
                "CONFIRMEE",
                "ANNULEE",
                "TERMINEE"
              ]
            },
            "paiement": {
              "type": "object",
              "description": "Informations de paiement"
            },
            "commentaires": {
              "type": "string",
              "description": "Commentaires"
            },
            "checkIn": {
              "type": "object",
              "description": "Informations de check-in"
            },
            "checkOut": {
              "type": "object",
              "description": "Informations de check-out"
            }
          }
        },
        "CreateServiceDto": {
          "type": "object",
          "properties": {
            "nom": {
              "type": "string",
              "description": "Nom du service"
            },
            "description": {
              "type": "string",
              "description": "Description du service"
            },
            "prix": {
              "type": "number",
              "description": "Prix du service"
            },
            "categorie": {
              "type": "string",
              "description": "Catégorie du service"
            },
            "etablissement": {
              "type": "string",
              "description": "ID de l'établissement"
            },
            "disponible": {
              "type": "boolean",
              "description": "Disponibilité du service"
            },
            "images": {
              "description": "Images du service",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "horaires": {
              "type": "object",
              "description": "Horaires du service"
            },
            "dureeMinutes": {
              "type": "number",
              "description": "Durée du service en minutes"
            },
            "reduction": {
              "type": "number",
              "description": "Réduction en pourcentage"
            },
            "tags": {
              "description": "Tags du service",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "options": {
              "type": "object",
              "description": "Options du service"
            }
          },
          "required": [
            "nom",
            "description",
            "prix",
            "categorie",
            "etablissement"
          ]
        },
        "UpdateServiceDto": {
          "type": "object",
          "properties": {
            "nom": {
              "type": "string",
              "description": "Nom du service"
            },
            "description": {
              "type": "string",
              "description": "Description du service"
            },
            "prix": {
              "type": "number",
              "description": "Prix du service"
            },
            "categorie": {
              "type": "string",
              "description": "Catégorie du service"
            },
            "etablissement": {
              "type": "string",
              "description": "ID de l'établissement"
            },
            "disponible": {
              "type": "boolean",
              "description": "Disponibilité du service"
            },
            "images": {
              "description": "Images du service",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "horaires": {
              "type": "object",
              "description": "Horaires du service"
            },
            "dureeMinutes": {
              "type": "number",
              "description": "Durée du service en minutes"
            },
            "reduction": {
              "type": "number",
              "description": "Réduction en pourcentage"
            },
            "tags": {
              "description": "Tags du service",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "options": {
              "type": "object",
              "description": "Options du service"
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
