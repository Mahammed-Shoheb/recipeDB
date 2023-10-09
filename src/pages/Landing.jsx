import { useLoaderData } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import { SearchForm } from '../components/SearchForm';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
const recipeSearchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const searchRecipesQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm],
    queryFn: async () => {
      const response = await axios.get(`${recipeSearchURL}${searchTerm}`);
      return response.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search') || '';
    await queryClient.ensureQueryData(searchRecipesQuery(searchTerm));
    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data } = useQuery(searchRecipesQuery(searchTerm));
  return (
    <div>
      <SearchForm searchTerm={searchTerm} />
      <RecipeList meals={data.meals} />
    </div>
  );
};
export default Landing;
