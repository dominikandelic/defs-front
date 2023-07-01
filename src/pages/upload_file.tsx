import axios, { AxiosError } from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import UploadImage from "../../public/upload.svg";
import { toast } from "react-toastify";

type UploadFileArgs = {
  sender: string;
  fileKey: string;
  file: FileList;
};

const UploadFilePage = () => {
  const [lastMessage, setLastMessage] = useState("No message received yet");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadFileArgs>();

  useSubscription(
    ["/topic/add_client_node", "/topic/add_new_block"],
    (message) => setLastMessage(message.body)
  );

  const [show, setShow] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>();
  const handleClose = () => setShow(false);

  const onSubmit: SubmitHandler<UploadFileArgs> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("file", data.file[0]);
      formData.append(
        "body",
        new Blob(
          [
            JSON.stringify({
              sender: data.sender,
              fileKey: data.fileKey,
            }),
          ],
          {
            type: "application/json",
          }
        )
      );

      const response = await axios.post(
        "http://localhost:8081/api/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponseMessage(response.data);
      setShow(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Upload file - Blockchain project</title>
        <meta name="description" content="Blockchain project meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {responseMessage}
          <br />
          <span className="text-danger">Don't forget your file key!</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row>
          <Col className="d-flex aling-items-center">
            <h1>Upload file</h1>{" "}
            <Image width={50} height={50} src={UploadImage} alt="Upload file" />
          </Col>
        </Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Sender</Form.Label>
                <Form.Control {...register("sender")} type="text" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>File Key (A.K.A decryption key)</Form.Label>
                <Form.Control {...register("fileKey")} type="text" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Your submission</Form.Label>
                <Form.Control {...register("file")} type="file" />
              </Form.Group>
            </Row>
            <Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Row>
            <Row>
              <Alert variant="warning">
                By uploading the file, you acknowledge that it will be stored
                forever on the blockchain and the P2P network and that if both
                you and the recipient lose the decryption key, it will be
                impossible to recover the lost file. Keep the key somewhere
                safe.
              </Alert>
            </Row>
            <div>Last Message: {lastMessage}</div>
          </Form>
        </Col>
      </Container>
    </>
  );
};

export default UploadFilePage;
