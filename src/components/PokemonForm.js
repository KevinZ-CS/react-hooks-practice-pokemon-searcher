import React, { useState } from "react";
import { Form } from "semantic-ui-react";

function PokemonForm({ handlePost }) {

  const [formData, setFormData] = useState({
    name: '',
    hp: 0,
    front: '',
    back: '',
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3001/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        hp: parseInt(formData.hp),
        sprites: {
          front: formData.front,
          back: formData.back,
        }
      })
    })
    .then((r) => r.json())
    .then((newPoke) => handlePost(newPoke))
  }

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={handleChange} />
          <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={handleChange} />
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="front"
            onChange={handleChange}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="back"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
