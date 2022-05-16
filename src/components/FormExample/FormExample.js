import { Form, Button } from "react-bootstrap";

function FormExample(props) {
  return (
    <Form noValidate validated={props.validated} onSubmit={props.onZIPSubmit}>
      <Form.Group controlId="validationCustom05">
        <Form.Label>Place your starting zip.</Form.Label>
        <Form.Control
          onChange={props.onZIPChange}
          type="number"
          placeholder="Zip"
          min="1"
          max="99950"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid zip.
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default FormExample;
