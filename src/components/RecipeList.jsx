import styled from 'styled-components';
import RecipeCard from './RecipeCard';

const RecipeList = ({ meals }) => {
  if (!meals) {
    return (
      <h4 style={{ textAlign: 'center' }}>No matching recipes found...</h4>
    );
  }
  const formattedRecipe = meals.map((recipe) => {
    const {
      idMeal: id,
      strMeal: name,
      strCategory: category,
      strArea: area,
      strMealThumb: img,
    } = recipe;

    return { id, name, category, area, img };
  });
  return (
    <Wrapper>
      {formattedRecipe.map((recipe) => {
        return <RecipeCard key={recipe.id} {...recipe} />;
      })}
    </Wrapper>
  );
};
export default RecipeList;

const Wrapper = styled.section`
  background: var(--white);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 2rem;
  padding: 0%.5;
`;
