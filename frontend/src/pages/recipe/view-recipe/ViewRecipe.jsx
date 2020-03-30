import React from 'react';
import {useParams} from 'react-router-dom';
import ViewRecipePage from './ViewRecipePage'

export default function ViewRecipe() {
    // recipeID will be null for the create page
    const { recipeID } = useParams();

    return (
        <main>
            <ViewRecipePage postID={recipeID} />
        </main>
    );
}
