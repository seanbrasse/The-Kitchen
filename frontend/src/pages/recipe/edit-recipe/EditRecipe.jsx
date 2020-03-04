import React from 'react';
import {useParams} from 'react-router-dom';

export default function EditRecipe() {
    // recipeID will be null for the create page
    const { recipeID } = useParams();

    return (
        <main>
            <h1>{recipeID ? 'EDIT' : 'CREATE'} RECIPE {recipeID}</h1>
        </main>
    );
}