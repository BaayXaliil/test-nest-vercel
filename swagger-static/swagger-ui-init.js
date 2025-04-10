
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
      "/api/auth/login": {
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
              "description": "Identifiants invalides"
            }
          },
          "summary": "Connexion utilisateur",
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/register": {
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
              "description": "Inscription réussie"
            },
            "400": {
              "description": "Données invalides"
            }
          },
          "summary": "Inscription utilisateur",
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/profile": {
        "get": {
          "operationId": "AuthController_getProfile",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Profil récupéré avec succès"
            },
            "401": {
              "description": "Non authentifié"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer le profil utilisateur",
          "tags": [
            "auth"
          ]
        }
      },
      "/api/users": {
        "get": {
          "operationId": "UsersController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Liste des utilisateurs récupérée avec succès"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer tous les utilisateurs",
          "tags": [
            "users"
          ]
        }
      },
      "/api/users/{id}": {
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
              "description": "Utilisateur récupéré avec succès"
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
            "users"
          ]
        },
        "put": {
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
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Utilisateur mis à jour avec succès"
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
            "users"
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
              "description": "Utilisateur supprimé avec succès"
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
            "users"
          ]
        }
      },
      "/api/policies": {
        "post": {
          "operationId": "PoliciesController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePolicyDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Police créée avec succès"
            },
            "400": {
              "description": "Données invalides"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Créer une nouvelle police d'assurance",
          "tags": [
            "policies"
          ]
        },
        "get": {
          "operationId": "PoliciesController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Liste des polices récupérée avec succès"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer toutes les polices",
          "tags": [
            "policies"
          ]
        }
      },
      "/api/policies/active": {
        "get": {
          "operationId": "PoliciesController_findActive",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Liste des polices actives récupérée avec succès"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer les polices actives",
          "tags": [
            "policies"
          ]
        }
      },
      "/api/policies/statistics": {
        "get": {
          "operationId": "PoliciesController_getStatistics",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Statistiques récupérées avec succès"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer les statistiques des polices",
          "tags": [
            "policies"
          ]
        }
      },
      "/api/policies/{id}": {
        "get": {
          "operationId": "PoliciesController_findOne",
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
              "description": "Police récupérée avec succès"
            },
            "404": {
              "description": "Police non trouvée"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer une police par son ID",
          "tags": [
            "policies"
          ]
        },
        "put": {
          "operationId": "PoliciesController_update",
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
                  "$ref": "#/components/schemas/UpdatePolicyDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Police mise à jour avec succès"
            },
            "404": {
              "description": "Police non trouvée"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Mettre à jour une police",
          "tags": [
            "policies"
          ]
        },
        "delete": {
          "operationId": "PoliciesController_remove",
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
              "description": "Police supprimée avec succès"
            },
            "404": {
              "description": "Police non trouvée"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Supprimer une police",
          "tags": [
            "policies"
          ]
        }
      },
      "/api/policies/{id}/activate": {
        "put": {
          "operationId": "PoliciesController_activate",
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
              "description": "Police activée avec succès"
            },
            "404": {
              "description": "Police non trouvée"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Activer une police",
          "tags": [
            "policies"
          ]
        }
      },
      "/api/policies/{id}/deactivate": {
        "put": {
          "operationId": "PoliciesController_deactivate",
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
              "description": "Police désactivée avec succès"
            },
            "404": {
              "description": "Police non trouvée"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Désactiver une police",
          "tags": [
            "policies"
          ]
        }
      },
      "/api/claims": {
        "post": {
          "operationId": "ClaimsController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateClaimDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Réclamation créée avec succès"
            },
            "400": {
              "description": "Données invalides"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Créer une nouvelle réclamation",
          "tags": [
            "claims"
          ]
        },
        "get": {
          "operationId": "ClaimsController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Liste des réclamations récupérée avec succès"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer toutes les réclamations",
          "tags": [
            "claims"
          ]
        }
      },
      "/api/claims/statistics": {
        "get": {
          "operationId": "ClaimsController_getStatistics",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Statistiques récupérées avec succès"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer les statistiques des réclamations",
          "tags": [
            "claims"
          ]
        }
      },
      "/api/claims/{id}": {
        "get": {
          "operationId": "ClaimsController_findOne",
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
              "description": "Réclamation récupérée avec succès"
            },
            "404": {
              "description": "Réclamation non trouvée"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer une réclamation par son ID",
          "tags": [
            "claims"
          ]
        },
        "put": {
          "operationId": "ClaimsController_update",
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
                  "$ref": "#/components/schemas/UpdateClaimDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Réclamation mise à jour avec succès"
            },
            "404": {
              "description": "Réclamation non trouvée"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Mettre à jour une réclamation",
          "tags": [
            "claims"
          ]
        },
        "delete": {
          "operationId": "ClaimsController_remove",
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
              "description": "Réclamation supprimée avec succès"
            },
            "404": {
              "description": "Réclamation non trouvée"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Supprimer une réclamation",
          "tags": [
            "claims"
          ]
        }
      },
      "/api/claims/{id}/status": {
        "put": {
          "operationId": "ClaimsController_updateStatus",
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
              "description": "Statut mis à jour avec succès"
            },
            "404": {
              "description": "Réclamation non trouvée"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Mettre à jour le statut d'une réclamation",
          "tags": [
            "claims"
          ]
        }
      },
      "/api/payments": {
        "post": {
          "operationId": "PaymentsController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePaymentDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Paiement créé avec succès"
            },
            "400": {
              "description": "Données invalides"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Créer un nouveau paiement",
          "tags": [
            "payments"
          ]
        },
        "get": {
          "operationId": "PaymentsController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Liste des paiements récupérée avec succès"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer tous les paiements",
          "tags": [
            "payments"
          ]
        }
      },
      "/api/payments/statistics": {
        "get": {
          "operationId": "PaymentsController_getStatistics",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Statistiques récupérées avec succès"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer les statistiques des paiements",
          "tags": [
            "payments"
          ]
        }
      },
      "/api/payments/overdue": {
        "get": {
          "operationId": "PaymentsController_findOverdue",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Liste des paiements en retard récupérée avec succès"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer les paiements en retard",
          "tags": [
            "payments"
          ]
        }
      },
      "/api/payments/{id}": {
        "get": {
          "operationId": "PaymentsController_findOne",
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
              "description": "Paiement récupéré avec succès"
            },
            "404": {
              "description": "Paiement non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Récupérer un paiement par son ID",
          "tags": [
            "payments"
          ]
        },
        "put": {
          "operationId": "PaymentsController_update",
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
                  "$ref": "#/components/schemas/UpdatePaymentDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Paiement mis à jour avec succès"
            },
            "404": {
              "description": "Paiement non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Mettre à jour un paiement",
          "tags": [
            "payments"
          ]
        },
        "delete": {
          "operationId": "PaymentsController_remove",
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
              "description": "Paiement supprimé avec succès"
            },
            "404": {
              "description": "Paiement non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Supprimer un paiement",
          "tags": [
            "payments"
          ]
        }
      },
      "/api/payments/{id}/complete": {
        "put": {
          "operationId": "PaymentsController_markAsCompleted",
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
              "description": "Paiement marqué comme complété avec succès"
            },
            "404": {
              "description": "Paiement non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Marquer un paiement comme complété",
          "tags": [
            "payments"
          ]
        }
      },
      "/api/payments/{id}/fail": {
        "put": {
          "operationId": "PaymentsController_markAsFailed",
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
              "description": "Paiement marqué comme échoué avec succès"
            },
            "404": {
              "description": "Paiement non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Marquer un paiement comme échoué",
          "tags": [
            "payments"
          ]
        }
      },
      "/api/payments/{id}/refund": {
        "put": {
          "operationId": "PaymentsController_markAsRefunded",
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
              "description": "Paiement marqué comme remboursé avec succès"
            },
            "404": {
              "description": "Paiement non trouvé"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Marquer un paiement comme remboursé",
          "tags": [
            "payments"
          ]
        }
      }
    },
    "info": {
      "title": "API Plateforme d'Assurance",
      "description": "Documentation de l'API de la plateforme d'assurance",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "auth",
        "description": "Authentification"
      },
      {
        "name": "users",
        "description": "Gestion des utilisateurs"
      },
      {
        "name": "policies",
        "description": "Gestion des polices d'assurance"
      },
      {
        "name": "claims",
        "description": "Gestion des réclamations"
      },
      {
        "name": "payments",
        "description": "Gestion des paiements"
      }
    ],
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
        "LoginDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "dioptrie7@gmail.com",
              "description": "Adresse email de l'utilisateur"
            },
            "password": {
              "type": "string",
              "example": "samacode7",
              "description": "Mot de passe de l'utilisateur (minimum 6 caractères)"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "RegisterDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string",
              "example": "John",
              "description": "Prénom de l'utilisateur"
            },
            "lastName": {
              "type": "string",
              "example": "Doe",
              "description": "Nom de l'utilisateur"
            },
            "email": {
              "type": "string",
              "example": "john.doe@example.com",
              "description": "Adresse email de l'utilisateur"
            },
            "password": {
              "type": "string",
              "example": "password123",
              "description": "Mot de passe de l'utilisateur (minimum 6 caractères)"
            },
            "role": {
              "type": "string",
              "enum": [
                "admin",
                "sales_chief",
                "sales_agent",
                "client_manager",
                "claims_manager",
                "beneficiary"
              ],
              "example": "beneficiary",
              "description": "Rôle de l'utilisateur"
            }
          },
          "required": [
            "firstName",
            "lastName",
            "email",
            "password",
            "role"
          ]
        },
        "UpdateUserDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string",
              "example": "John",
              "description": "Prénom de l'utilisateur"
            },
            "lastName": {
              "type": "string",
              "example": "Doe",
              "description": "Nom de l'utilisateur"
            },
            "email": {
              "type": "string",
              "example": "john.doe@example.com",
              "description": "Adresse email de l'utilisateur"
            },
            "password": {
              "type": "string",
              "example": "password123",
              "description": "Mot de passe de l'utilisateur (minimum 6 caractères)"
            },
            "role": {
              "type": "string",
              "enum": [
                "admin",
                "sales_chief",
                "sales_agent",
                "client_manager",
                "claims_manager",
                "beneficiary"
              ],
              "example": "beneficiary",
              "description": "Rôle de l'utilisateur"
            }
          }
        },
        "CoverageDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "example": "health",
              "description": "Type de couverture"
            },
            "amount": {
              "type": "number",
              "example": 100000,
              "description": "Montant de la couverture"
            },
            "currency": {
              "type": "string",
              "example": "EUR",
              "description": "Devise de la couverture"
            }
          },
          "required": [
            "type",
            "amount",
            "currency"
          ]
        },
        "PremiumDto": {
          "type": "object",
          "properties": {
            "amount": {
              "type": "number",
              "example": 100,
              "description": "Montant de la prime"
            },
            "frequency": {
              "type": "string",
              "example": "monthly",
              "description": "Fréquence de paiement de la prime"
            },
            "currency": {
              "type": "string",
              "example": "EUR",
              "description": "Devise de la prime"
            }
          },
          "required": [
            "amount",
            "frequency",
            "currency"
          ]
        },
        "CreatePolicyDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Assurance Santé Premium",
              "description": "Nom de la police d'assurance"
            },
            "description": {
              "type": "string",
              "example": "Une assurance santé complète pour toute la famille",
              "description": "Description de la police d'assurance"
            },
            "coverage": {
              "description": "Détails de la couverture",
              "allOf": [
                {
                  "$ref": "#/components/schemas/CoverageDto"
                }
              ]
            },
            "premium": {
              "description": "Détails de la prime",
              "allOf": [
                {
                  "$ref": "#/components/schemas/PremiumDto"
                }
              ]
            },
            "beneficiaries": {
              "example": [
                "userId1",
                "userId2"
              ],
              "description": "Liste des IDs des bénéficiaires",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "waitingPeriod": {
              "type": "number",
              "example": 30,
              "description": "Période d'attente en jours"
            },
            "terms": {
              "example": [
                "Terme 1",
                "Terme 2"
              ],
              "description": "Liste des termes et conditions",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "name",
            "description",
            "coverage",
            "premium",
            "beneficiaries",
            "waitingPeriod",
            "terms"
          ]
        },
        "UpdateCoverageDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "example": "health",
              "description": "Type de couverture"
            },
            "amount": {
              "type": "number",
              "example": 100000,
              "description": "Montant de la couverture"
            },
            "currency": {
              "type": "string",
              "example": "EUR",
              "description": "Devise de la couverture"
            }
          }
        },
        "UpdatePremiumDto": {
          "type": "object",
          "properties": {
            "amount": {
              "type": "number",
              "example": 100,
              "description": "Montant de la prime"
            },
            "frequency": {
              "type": "string",
              "example": "monthly",
              "description": "Fréquence de paiement de la prime"
            },
            "currency": {
              "type": "string",
              "example": "EUR",
              "description": "Devise de la prime"
            }
          }
        },
        "UpdatePolicyDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Assurance Santé Premium",
              "description": "Nom de la police d'assurance"
            },
            "description": {
              "type": "string",
              "example": "Une assurance santé complète pour toute la famille",
              "description": "Description de la police d'assurance"
            },
            "coverage": {
              "description": "Détails de la couverture",
              "allOf": [
                {
                  "$ref": "#/components/schemas/UpdateCoverageDto"
                }
              ]
            },
            "premium": {
              "description": "Détails de la prime",
              "allOf": [
                {
                  "$ref": "#/components/schemas/UpdatePremiumDto"
                }
              ]
            },
            "beneficiaries": {
              "example": [
                "userId1",
                "userId2"
              ],
              "description": "Liste des IDs des bénéficiaires",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "waitingPeriod": {
              "type": "number",
              "example": 30,
              "description": "Période d'attente en jours"
            },
            "terms": {
              "example": [
                "Terme 1",
                "Terme 2"
              ],
              "description": "Liste des termes et conditions",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "isActive": {
              "type": "boolean",
              "example": true,
              "description": "Statut d'activation de la police"
            }
          }
        },
        "CreateClaimDto": {
          "type": "object",
          "properties": {
            "beneficiaryId": {
              "type": "string",
              "example": "userId",
              "description": "ID du bénéficiaire"
            },
            "policyId": {
              "type": "string",
              "example": "policyId",
              "description": "ID de la police d'assurance"
            },
            "amount": {
              "type": "number",
              "example": 1000,
              "description": "Montant de la réclamation"
            },
            "currency": {
              "type": "string",
              "example": "EUR",
              "description": "Devise de la réclamation"
            },
            "description": {
              "type": "string",
              "example": "Description détaillée de la réclamation",
              "description": "Description de la réclamation"
            },
            "documents": {
              "example": [
                "doc1.pdf",
                "doc2.pdf"
              ],
              "description": "Liste des documents justificatifs",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "beneficiaryId",
            "policyId",
            "amount",
            "currency",
            "description"
          ]
        },
        "UpdateClaimDto": {
          "type": "object",
          "properties": {
            "amount": {
              "type": "number",
              "example": 1000,
              "description": "Montant de la réclamation"
            },
            "currency": {
              "type": "string",
              "example": "EUR",
              "description": "Devise de la réclamation"
            },
            "description": {
              "type": "string",
              "example": "Description détaillée de la réclamation",
              "description": "Description de la réclamation"
            },
            "documents": {
              "example": [
                "doc1.pdf",
                "doc2.pdf"
              ],
              "description": "Liste des documents justificatifs",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "status": {
              "type": "string",
              "enum": [
                "pending",
                "processing",
                "approved",
                "rejected",
                "paid"
              ],
              "example": "processing",
              "description": "Statut de la réclamation"
            },
            "processingNotes": {
              "type": "string",
              "example": "Notes de traitement de la réclamation",
              "description": "Notes de traitement"
            }
          }
        },
        "CreatePaymentDto": {
          "type": "object",
          "properties": {
            "sponsorId": {
              "type": "string",
              "example": "sponsorId",
              "description": "ID du sponsor"
            },
            "policyId": {
              "type": "string",
              "example": "policyId",
              "description": "ID de la police d'assurance"
            },
            "amount": {
              "type": "number",
              "example": 1000,
              "description": "Montant du paiement"
            },
            "currency": {
              "type": "string",
              "example": "EUR",
              "description": "Devise du paiement"
            },
            "dueDate": {
              "format": "date-time",
              "type": "string",
              "example": "2024-02-01",
              "description": "Date d'échéance du paiement"
            },
            "invoiceNumber": {
              "type": "string",
              "example": "INV-2024-001",
              "description": "Numéro de facture"
            }
          },
          "required": [
            "sponsorId",
            "policyId",
            "amount",
            "currency",
            "dueDate",
            "invoiceNumber"
          ]
        },
        "UpdatePaymentDto": {
          "type": "object",
          "properties": {
            "amount": {
              "type": "number",
              "example": 1000,
              "description": "Montant du paiement"
            },
            "currency": {
              "type": "string",
              "example": "EUR",
              "description": "Devise du paiement"
            },
            "dueDate": {
              "format": "date-time",
              "type": "string",
              "example": "2024-02-01",
              "description": "Date d'échéance du paiement"
            },
            "invoiceNumber": {
              "type": "string",
              "example": "INV-2024-001",
              "description": "Numéro de facture"
            },
            "status": {
              "type": "string",
              "enum": [
                "pending",
                "completed",
                "failed",
                "refunded"
              ],
              "example": "completed",
              "description": "Statut du paiement"
            },
            "transactionId": {
              "type": "string",
              "example": "TXN-123456",
              "description": "ID de la transaction"
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
