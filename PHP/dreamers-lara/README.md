# Clone the repository
git clone <repo_url>
cd <project_directory>

# Install dependencies
composer install

# Set up environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file, then run migrations
php artisan migrate --seed

# Start the development server
php artisan serve

------------------------------------------------------------------------------------------------------------------------

# Business Logic

# User Module

# Create User (POST /users)

->Validate name, email (unique), and password (min:8).
->Store user with hashed password and default role: associate.
->Return success response with user data.

# Update User (PUT /users/{id})

->Find user by ID.
->Validate and update name, email, and password.
->Return updated user data.

# Fetch Users (GET /users)

->Retrieve all users and return response.

# Delete User (DELETE /users/{id})
->Find user and delete.
->Return success message.

# Error Handling

->Validation errors return a failure response.
->Non-existent users return 404 Not Found.
->Server errors return 500 Internal Server Error.

# Roles

->Default role: associate, can be overridden at creation.

------------------------------------------------------------------------------------------------------------------------


# Authentication Operations

# Register (POST /register)

->Validate name, email (unique), and password (min:8).
->Create user and return success response with user data.

# Login (POST /login)

->Validate email and password.
->Authenticate user and generate an auth token.
->Store token and return success response with user data.

# Logout (POST /logout)

->Clear auth token from the user record.
->Return success response.

# Error Handling

->Validation errors return a failure response.
->Non-existent users return 404 Not Found.
->Incorrect credentials return Invalid credentials.
->Server errors return 500 Internal Server Error.

------------------------------------------------------------------------------------------------------------------------

# Organization Operations

# Create Organization (POST /organizations)

->Validate name (unique) and optional description.
->Store organization with creator’s user ID.
->Return success response with organization data.

# Update Organization (PUT /organizations/{id})

->Find organization by ID.
->Validate and update name and description.
->Return updated organization data.

# Fetch Organizations (GET /organizations)

->Retrieve all organizations and return response.

# Delete Organization (DELETE /organizations/{id})

->Find organization and delete.
->Return success message.

# Error Handling

->Validation errors return a failure response.
->Non-existent users or organizations return 404 Not Found.
->Incorrect credentials return Invalid credentials.
->Server errors return 500 Internal Server Error.

------------------------------------------------------------------------------------------------------------------------

# Team Operations

# Create Team (POST /teams)

->Validate name (unique), description, manager_id, associate_ids, and organization_id.
->Store team with creator’s user ID.
->manager_id is stored as an integer referencing the manager's user ID.
->associate_ids is stored as a JSON array of integers representing associate user IDs.
->Return success response with team data.

# Update Team (PUT /teams/{id})

->Find team by ID.
->Validate and update name, description, manager_id, associate_ids, and organization_id.
->manager_id remains an integer reference.
->associate_ids is updated as a JSON array.
->Return updated team data.

# Fetch Teams (GET /teams)

->Retrieve all teams and return response.

# Delete Team (DELETE /teams/{id})

->Find team and delete.
->Return success message.

# Error Handling

->Validation errors return a failure response.
->Non-existent users, organizations, or teams return 404 Not Found.
->Incorrect credentials return Invalid credentials.
->Server errors return 500 Internal Server Error.

------------------------------------------------------------------------------------------------------------------------

# Project Operations

# Create Team (POST /teams)
->This operation creates a new team with a name, description, manager, associates, and organization.

# Request Endpoint: POST /teams

# Request Body:
->name: (string) The name of the team. This field is required and must be unique.
->description: (string) A brief description of the team. This field is optional.
->manager_id: (integer) The user ID of the team manager. This field is required and must reference an existing user in the users table.
->associate_ids: (array of integers) An array of associate user IDs. Each user ID must exist in the users table.
->organization_id: (integer) The ID of the organization the team belongs to. This field is required and must reference an existing organization in the organizations table.

# Process:

->Validate the name, description, manager_id, associate_ids, and organization_id inputs.
->Create a new team record, storing the team’s name, description, manager’s ID, associates, and organization ID.
->The creator’s user ID (auth user) is stored in the created_by field of the team.

# Response:
->Upon success, the server will return a response containing the team’s data, including the associated manager and associates.


# Update Team (PUT /teams/{id})
->This operation allows updating an existing team’s details, such as name, description, manager, associates, and organization.

# Request Endpoint: PUT /teams/{id}

# Request Body:
->name: (string) The updated name of the team. This field is required and must be unique.
->description: (string) The updated description of the team.
->manager_id: (integer) The updated manager ID (must reference a user in the users table).
->associate_ids: (array of integers) The updated list of associate user IDs (each ID must reference a user).
->organization_id: (integer) The updated organization ID (must reference an organization in the organizations table).

# Process:
->Find the team by its ID.
->Validate the new values for name, description, manager_id, associate_ids, and organization_id.
->Update the team’s details in the database, including the manager’s ID and associates as a JSON array.
->Return the updated team’s data.

# Response:
->Upon success, the server will return the updated team data.

# Fetch Teams (GET /teams)
->This operation retrieves all teams in the system.

# Request Endpoint: GET /teams
->Retrieve all teams from the database and return the list.
->Include necessary team information like name, description, manager_id, associate_ids, and organization_id.

# Response:
Upon success, the server will return a list of all teams.

# Delete Team (DELETE /teams/{id})
->This operation allows deleting a team by its ID.

# Request Endpoint: DELETE /teams/{id}
->Find the team by its ID.
->Delete the team from the database.

# Response:
->Upon success, the server will return a success message confirming that the team has been deleted.

------------------------------------------------------------------------------------------------------------------------

# Review Operations

# Roles
->Executive: Can view all reviews but cannot create or edit any reviews.
->Manager: Can view reviews of themselves, their team members, and projects their team is involved in.
->Associate: Can view reviews of themselves and projects their team is involved in.

# GET /reviews
->Fetch Reviews: This endpoint fetches the reviews based on the user’s role.
->Executives: Can view all reviews (including reviewer names).
->Managers: Can view their own reviews, their team's reviews, and reviews of projects their team is involved in.
->Associates: Can view their own reviews and reviews of projects their team is involved in.
->Response: A collection of reviews based on the role, wrapped in the ReviewResource.

# POST /reviews
->Create Review: Allows a user to create a review for a manager, associate, project, or team.
->Validation: Checks for reviewable_type, reviewable_id, and review inputs.
->Permissions: Users can only review entities they belong to (teams they manage, teams they are associated with, or projects they are linked to).
->Executives: Cannot create or edit reviews.
->Reviewable Types:
->manager: The review is for a manager.
->associate: The review is for an associate.
->project: The review is for a project.
->team: The review is for a team.
->Response: On success, returns the created review wrapped in ReviewResource. Otherwise, returns an error message.

# PUT /reviews/{id}
->Update Review: This endpoint allows users to update their own reviews.
->Validation: Checks for reviewable_type, reviewable_id, and review inputs.
->Permissions: A user can only edit their own reviews.
->Response: Returns the updated review wrapped in ReviewResource on success. Otherwise, an error message is returned.

# DELETE /reviews/{id}
->Delete Review: This endpoint allows users to delete their own reviews.
->Permissions: Users can only delete their own reviews.
->Response: Returns a success message if the review is deleted. Otherwise, an error message is returned.

# Helper Methods

->isUserAllowedToReview($user, $reviewableType, $reviewableId)
->This method checks if a user has the right to review a given entity (manager, associate, project, or team).
->Executives: Cannot review anything (returns error).
->Managers and Associates: Only allowed to review entities (manager, associate, project, team) they are linked with.
->Projects: A user can review a project if they belong to a team linked to the project.
->Teams: A user can review a team if they are a manager or associate of that team.
->Returns an array with:
->status (boolean): Indicates whether the user is allowed to review the entity.
->message (string): Describes why the review action is allowed or denied.

# Error Handling
->Validation Errors: If the request does not pass validation, a failure response is returned.
->Unauthorized: Users cannot perform review actions on entities they are not associated with.
->Role Restrictions: Executives are restricted from creating or updating reviews.
->Server Errors: Returns a generic 500 error if any server-side issue occurs.

