import styled from 'styled-components';

import { Link, Navigate, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const singleRecipeURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const singleRecipeQury = (id) => {
  return {
    queryKey: ['recipe', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleRecipeURL}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleRecipeQury(id));
    return { id };
  };

const youtubeEmbeded = 'https://www.youtube.com/embed/';

const SingleRecipePage = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleRecipeQury(id));

  if (!data) <Navigate to='/' />;

  const singleRecipe = data.meals[0];

  const {
    strMeal: name,
    strCategory: category,
    strInstructions: instructions,
    strArea: area,
    strMealThumb: img,
    strYoutube: youtube,
  } = singleRecipe;

  const validIngredients = Object.keys(singleRecipe)
    .filter((key) => key.startsWith('strIngredient') && singleRecipe[key])
    .map((key) => singleRecipe[key]);
  const validMeasures = Object.keys(singleRecipe)
    .filter(
      (key) =>
        key.startsWith('strMeasure') &&
        singleRecipe[key] !== '' &&
        singleRecipe[key] !== null &&
        singleRecipe[key] !== ' '
    )
    .map((key) => singleRecipe[key]);

  return (
    <Wrapper>
      <header>
        <Link to='/' className='btn'>
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className='recipe'>
        <div>
          <img src={img} alt={name} className='img' />

          <iframe
            src={`${youtubeEmbeded}${youtube.split('v=')[1]}`}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
            className='md-scree-iframe'
          ></iframe>
        </div>
        <div className='recipe-info'>
          <p>
            <span className='recipe-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='recipe-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='recipe-data'>area :</span>
            {area}
          </p>
          <p>
            <span className='recipe-data'>ingredients :</span>
            {validIngredients.map((item, index) => {
              return (
                <span className='ing' key={item}>
                  {item}
                  {index < validIngredients.length - 1 ? ',' : ''}
                </span>
              );
            })}
          </p>
          <p>
            <span className='recipe-data'>measures :</span>
            {validMeasures.map((item, index) => {
              return (
                <span className='ing' key={index}>
                  {item}
                  {index < validMeasures.length - 1 ? ',' : ''}
                </span>
              );
            })}
          </p>
          <p>
            <span className='recipe-data'>instructions :</span>
            {instructions}
          </p>
        </div>
        <iframe
          className='sm-scree-iframe'
          src={`${youtubeEmbeded}${youtube.split('v=')[1]}`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
    </Wrapper>
  );
};
export default SingleRecipePage;

const Wrapper = styled.div`
  header {
    text-align: center;
    margin-bottom: 3rem;
    .btn {
      margin-bottom: 1rem;
    }
  }
  .youtube-link {
    color: var(--primary-400);
    text-decoration: underline;
  }
  .img {
    border-radius: var(--borderRadius);
  }
  .recipe-info {
    padding-top: 2rem;
  }
  .recipe p {
    font-weight: 700;
    text-transform: capitalize;
    line-height: 2;
    margin-bottom: 1rem;
  }
  .recipe-data {
    margin-right: 0.5rem;
    background: var(--primary-300);
    padding: 0.25rem 0.5rem;
    border-radius: var(--borderRadius);
    color: var(--primary-700);
    letter-spacing: var(--letterSpacing);
  }
  .ing {
    display: inline-block;
    margin-right: 0.5rem;
  }

  .md-scree-iframe,
  .sm-scree-iframe {
    width: 100%;
    border: none;

    border-radius: var(--borderRadius);
  }
  .md-scree-iframe {
    display: none;
  }
  .sm-scree-iframe {
    height: 10rem;
  }
  @media (min-width: 992px) {
    .recipe {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 3rem;
      align-items: start;
    }
    .recipe-info {
      padding-top: 0;
    }
    .sm-scree-iframe {
      display: none;
    }
    .md-scree-iframe {
      display: block;
      height: 15rem;
      margin: 1rem 0;
    }
  }
`;
