# LoveRecipe

```yaml
LoveRecipe is a site for Recipe lover who want to post his/her recipe and
want to find other's recipe and try to make that at his house. MERN App with  Authentication and user's 
password Encryption. User can give review and rating to other user's recipe.
````


## Backend Includes
- user, recipe and review  model
- user, recipe and review controller
- auth middleware
- user, recipe and review routes
- server, cypt and validator file

### Models
- User Model
```yaml
{
    fullName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
    },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
    },
  password: {
    type: String,
    required: true,
    trim: true
    },
  gender: {
    type: String,
    enum: ["male", "female", "others"]
    },
  city: {
    type: String,
    lowercase: true,
    trim: true
    }
},
````

- Recipe Model
```yaml
{
    name:{
        type:String,
        trim:true,
        required:true
        },
    items:[
            {
            type:String,
            trim:true,
            lowercase:true
            }
          ],
    process:{
        type:String,
        trim:true,
        lowercase:true
        },
    author:{
        type:ObjectId,
        ref:"userData",
        required:true
        },
    rating:{
        type:Number
        },
    totalReview:{
        type:Number,
        default:0
        },
    isDeleted:{
        type:Boolean,
        default:false
        }
},
````
- Review Model
```yaml
{
    recipeId:{
        type: ObjectId,
        ref: "recipeData",
        required:true
    },
    reviewer: {
        type: ObjectId,
        ref: "userData",
        required:true
    },
    review: {
        type: String
    },
    rate: {
        type: Number,
        min:1,
        max:5
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
````

## Users APIs
### POST /api/users/register
- Create a user by taking data from a request body .
- Password Should be in Encrypted Format.
- _Response format_
  - *On success* - Return HTTP status 201 with user document.
  - *On error* - Return a suitable error message with a valid HTTP status code.

### POST /api/users/login
- Allow an user to login with their email and password.
- _Response format_
    - *On success* - Return HTTP status 200 and JWT token in response body.
    - *On error* - Return a suitable error message with a valid HTTP status code.

## Recipe APIs
### POST /api/recipes/
- Create recipe by taking the data from request body.
- _Response format_
    - *On success* - Return HTTP status 201 and send recipeData in response body.
    - *On error* - Return a suitable error message with a valid HTTP status code.

### GET /api/recipes/:recipeId
- Get recipeId from path param.
- Find recipeData with authorData by the recipeId.
- _Response format_
  - *On success* - Return the recipeData with HTTP status code 200.
  - *On error* - Return a suitable error message with a valid HTTP status code.

### GET /api/recipes/
- Get name from query param
- Find recipeData matched(match using regex) with the name.
- If name was not provided, find all recipeData.
- _Response format_
  - *On success* - Return HTTP status 200 and return all recipeData.
  - *On error* - Return a suitable error message with a valid HTTP status code.

### DELETE /api/recipes/:recipeId
- Get recipeId from path param.
- Delete reviews by the recipeId.
- Delete the recipe.
- _Response format_
  - *On success* - Return HTTP status 200 with a success message.
  - *On error* - Return a suitable error message with a valid HTTP status code.

## Review APIs

## Middleware
### Authentication
- Make sure all the restricted routes are protected.

