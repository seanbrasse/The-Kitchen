import React from 'react';
import {useParams} from 'react-router-dom';
import EditRecipePage from './EditRecipePage'

export default function EditRecipe() {
    // recipeID will be null for the create page
    const { recipeID } = useParams();

    return (
        <main>
            <EditRecipePage postID={recipeID} />
        </main>
    );
}
