import React, {setState} from 'react';
import {TextField} from '@material-ui/core';


 function UpdatedMovie() {
    const initialState = {
      name: '',

    }

const [movie, setMovie] = setState()

  return (
    <>
      <form >
        <TextField
          id="title"
          label="Movie Title"
          variant="outlined"
        />
      </form>
    </>
)};

export default UpdatedMovie;