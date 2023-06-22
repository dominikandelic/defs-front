import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import UploadImage from "../../public/upload.svg";
import { toast } from "react-toastify";

type UploadFileArgs = {
  name: string;
  file: FileList;
};

const UploadFilePage = () => {
  const [lastMessage, setLastMessage] = useState("No message received yet");
  const stompClient = useStompClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadFileArgs>();
  const sendMessage = () => {
    if (stompClient) {
      //Send Message
      stompClient.publish({
        destination: "/app/echo",
        body: "hello",
      });
    } else {
      //Handle error
    }
  };

  useSubscription(
    ["/topic/add_client_node", "/topic/add_new_block"],
    (message) => setLastMessage(message.body)
  );

  const onSubmit: SubmitHandler<UploadFileArgs> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("file", data.file[0]);
      formData.append(
        "body",
        new Blob(
          [
            JSON.stringify({
              receiver: "bla",
              sender: "bla",
              fileKey: "bla",
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
      router.push(`/`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>Upload file - Blockchain project</title>
        <meta name="description" content="Blockchain project meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
