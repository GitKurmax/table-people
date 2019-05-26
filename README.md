# people-table

https://gitkurmax.github.io/people-table

People table  
DOM  
(#1) create a function showPeople(element, people)
element is a container for the Table.
```
 <div class="people">
   ...Table goes here
 </div>
 ```
people - is an array of people;  
(#1) generate a table from given items (without innerHTML and insretAdjucentHTML)
```
<table class="people__table">
   <thead>...</thead>
   <tbody>
     <tr class="person">
       <td></td> ... <td></td>
     </tr>
   </tbody>
 </table>
 ```
(#1) columns to display:  
id (position in the original array starting from 1)  
name  
sex  
born  
died  
age (calculated)  
century (Math.ceil(person.died / 100))  
mother  
father  
children as a comma separated names  
All the next tasks should modify the original generation code but not update the table after creation 

(#2) add class person--male/person--female based on sex
add lightpink background to all women  
(#3) add class person--mother/person--father based on children
add cornflowerblue background to all fathers  
(#4) add class person--lived-in-17 based on century  
(#5) add green border to all the people who lived for more than 65 years
add border-collapse: collapse style to the table  
(#6) mark some names in the table (including children column)  
use span with text-decoration: line-through for the names of the people born before 1650  
use span with bold text for the names of the people died after 1800
innerHTML  
(#7) reimplement function showPeople(element, people) using innerHTML without DOM methods (createElement and others)
Events Live example  
(#8) add sorting by name, age, born, died  
(#9) add an <input> to filter the table by name, mother and father  
(#10) Mark a cell as selected when user click on it (border: 3px solid blue)
there can be only one selected cell at a time  
(#11) allow selection only on cell having data-selectable attribute (let’s put it only on name, age, century cells)  
(#12) Redraw the table on any change  
Form  
(#13) add a form to add new people to the table  
all the above rules should be applied to added people
(#14) the form should be validated
all the fields are required  
sex should be chosen among 2 options (radio buttons)  
died - born should be less than 150  
