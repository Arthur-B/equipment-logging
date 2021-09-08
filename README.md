# Equipment log

## Introduction

This is a single web page application to log experiments and provide statistical insights.

It is developed using Django for the backend, React for the frontend, and Recharts for the visualization.

## Main functionalities

### Log

* Display recent experiments
* User can log new experiments into the database
* User can edit/delete recent experiments
* Provide a link to download the experiment database to a csv file

### Analytics

* Estimate deposition time to achieve desired thickness
* Check if deposition is stable over the last depositions

## To-do

### Feature / bug

* Update the graph when the table is updated

### Improvment / cleanup

* Remove old dependencies
* Clean up code, proper linting, etc.
* Reorder the file structure
* Make nice images for the README.md

## Module versions

* Django
* React
* csv-react
* Recharts

## Ressources

* [React and Django: Your guide to creating an app](https://blog.logrocket.com/creating-an-app-with-react-and-django/): initial ressource to get started and make a database and display with a table
* [react-csv/react-csv](https://github.com/react-csv/react-csv): Github repository of the npm module, provide useful examples
* [Implement linear regression in React](https://medium.com/createdd-notes/implement-linear-regression-in-react-d7e539814fe5)
* [A Comparison of Data Visualization Libraries for React](https://www.capitalone.com/tech/software-engineering/comparison-data-visualization-libraries-for-react/)