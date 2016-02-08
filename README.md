# Heroku Event Signup

## Photomatic Client

React application to take photos from webcam, edit photo and have fun and then share on Heroku or Twitter

## Development

1. `npm i`
1. `npm start`

This will use `webpack-dev-server` to run the client on `http://localhost:3000`

## Heroku Deploy Instruction

You must have [Heroku Toolbelt](https://toolbelt.heroku.com/) installed before beginning

1. `heroku create`
1. `heroku buildpacks:set https://github.com/ddollar/heroku-buildpack-multi.git`
1. `git push heroku master`

Done. ^5

## Licensing

Emoji provided free by [Emoji One](http://emojione.com)
