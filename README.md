# Meny: Back-end
Meny is a simple, fast and easy way to place an order in a restaurant without the help of a waiter. All you need to do is scan a QR code with your cellphone and select the items you want.

This is the back-end module of the project, you can also check the [website module](https://github.com/daviPombeiro/TCC-Meny-Front) and the [mobile module](https://github.com/daviPombeiro/TCC-Meny_Mobile).

_obs: the main database for this project is MongoDB, so the types may be different than what many people are used to_

## Routes

- [/users (post)](#users-post)
- [/users (get)](#users-get)

#
<a name="users-post"></a>
### /users - post
Register new user to the database
#### Parameters:
##### Body:
```
{
    name: String, //required
    email: String, //required
    password: String, //required
    age: Number, //required
    cpf: Number, //required
}
```
#### Responses
##### 200:
The new user was successfully registered in the database
```
{
    name: String,
    email: String,
    password: String,
    age: Number,
    cpf: Number,
}
```
##### 400:
Something went wrong
```
{
    error:{}
}
```
#
<a name="users-get"></a>
### /users - get
Get a list of users
#### Parameters:
None
#### Responses
##### 200:
A complete list of users registered in the database
```
[
    {
        name: String,
        email: String,
        password: String,
        age: Number,
        cpf: Number,
    }
]
```
##### 400:
Something went wrong
```
{
    error:{}
}
```
#
### /restaurant - post
Register new restaurant to the database
#### Parameters:
##### Body:
```
{
    name: String, //required
    address: {
        street: String, //required
        number: Number, //required
        neighbourhood: String, //required
        city: String, //required
        estate: String, //required
        cep: Number, //required
    },
    opening_hours: [
        {
            day_of_week: String,
            opening-hour: String,
            closing_hour: String
        }
    ],
    menu: [
        {
            name: String,
            items: [
                {
                    name: String,
                    price: Number,
                    description: String,
                    image: description
                }
            ]
        }
    ],
    tables: [ObjectId]
}
```  
#### Responses
##### 200:
The new restaurant was successfully registered in the database
```
{
    name: String,
    address: {
        street: String,
        number: Number,
        neighbourhood: String,
        city: String,
        estate: String,
        cep: Number,
    },
    opening_hours: [
        {
            day_of_week: String,
            opening-hour: String,
            closing_hour: String
        }
    ],
    menu: [
        {
            name: String,
            items: [
                {
                    name: String,
                    price: Number,
                    description: String,
                    image: description
                }
            ]
        }
    ],
    tables: [ObjectId]
}
``` 
##### 400:
Something went wrong
```
{
    error:{}
}
```
#
### /restaurant/:idRestaurant - get
Get the info of a restaurant based on the id given.
#### Parameters:
##### Path:
* idRestaurant: String (required)
#### Responses
##### 200:
The restaurant was found and their info was returned
```
{
    name: String,
    address: {
        street: String,
        number: Number,
        neighbourhood: String,
        city: String,
        estate: String,
        cep: Number,
    },
    opening_hours: [
        {
            day_of_week: String,
            opening-hour: String,
            closing_hour: String
        }
    ],
    menu: [
        {
            name: String,
            items: [
                {
                    name: String,
                    price: Number,
                    description: String,
                    image: description
                }
            ]
        }
    ],
    tables: [ObjectId]
}
``` 
##### 400:
Something went wrong
```
{
    error:{}
}
