import React from 'react';
import Spareparts from './Spareparts.js';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './ShowSubCategory.css';

// Importér Reactstrap komponenter
import { Container, Row, CardDeck } from 'reactstrap';

function ShowSubCategory() {
  const { id } = useParams();

  // Definér query til at hente en specifik underkategori
  const GET_SUB_CATEGORY_BY_ID = gql`
    {
      getSubCategoryById(_id: "${id}") {
        _id
        name
        categoryId
        imagePath
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SUB_CATEGORY_BY_ID);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  return (
    <Container className="contentWrapper">
      <h3>{data.getSubCategoryById.name}</h3>
      <img
        className="fadeIn"
        src={data.getSubCategoryById.imagePath}
        width="100%"
        alt={
          data.getSubCategoryById.imagePath &&
          data.getSubCategoryById.imagePath.slice(42)
        }
      />
      <h3 className="mt-4 mb-3">Reservedele</h3>
      <Row>
        <CardDeck className="fadeIn">
          <Spareparts />
        </CardDeck>
      </Row>
    </Container>
  );
}

export default ShowSubCategory;
