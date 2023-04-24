# TP4

Si vous cliquez sur le calque Roberries, une image comme celle ci-dessous vous sera montrée. Dans cette couche, chacun des cercles rouges représente un crime qui s'est produit à Montréal, et si vous maintenez la souris sur chacun des cercles, vous pouvez voir le type de crime qui s'est produit.

![1](https://user-images.githubusercontent.com/55294090/234135175-8ac32340-ae8e-4fc7-ae49-3992dda6525d.png)

Lorsque vous cliquez sur la couche crime 2019 et 2020, 4 éléments vous seront présentés.
Dans la partie supérieure droite, vous pouvez voir un graphique en forme de beignet qui montre les vols qualifiés qui ont eu lieu dans la ville de Montréal en 2019 et 2020.
Si vous effectuez un zoom avant sur la carte, les chiffres affichés dans ce graphique changeront. En d'autres termes, les statistiques de vol changent en zoomant sur la carte.
Dans la partie supérieure gauche, vous pouvez lire l'explication de ces chiffres et l'interprétation de la carte. J'ai décidé d'écrire ces descriptions pour aider le lecteur à mieux et plus facilement comprendre la carte. Vous pouvez facilement supprimer ces descriptions en cliquant sur la croix.
Et enfin, dans la partie inférieure droite, vous pouvez voir la légende liée à la carte


![2](https://user-images.githubusercontent.com/55294090/234137014-ad88b6c2-5a44-42b1-8693-7f1204876d5f.png)

![3](https://user-images.githubusercontent.com/55294090/234137320-af25ae26-7674-496f-baea-8a003c0b2297.png)


Dans la couche bâtiment, vous pouvez voir une vue 3D d'une petite partie des bâtiments de Montréal.

![4](https://user-images.githubusercontent.com/55294090/234138472-c42e4c93-5b7c-4e6c-ab1d-cf32a4684803.png)





Pour ce projet, j'ai essayé d'inclure la couche Web Map Service (WMS) dans mon travail, mais malheureusement je n'y suis pas parvenu.
C'est pourquoi j'ai décidé d'écrire son code et de le mettre dans le projet pour comprendre les problèmes de mon travail.
Le code que j'ai décidé d'utiliser pour cela est le suivant:


// source ajoutée de la couche wms
map.addSource("wms-test", {
   tapez : "trame",
   // utilisez l'option tiles pour spécifier une URL de source de tuile WMS
   carrelage: [
     //coller le lien wms ici
   ],
   tuileTaille: 256,
});
//ajoute la couche de la source wms
map.addLayer(
   {
     // identifiant de couche
     id : "wms-test-layer",
     tapez : "trame",
     //identifiant-source
     source : "wms-test",
     peindre: {},
   },
  
);
