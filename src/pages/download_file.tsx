import axios, { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type DownloadFileArgs = {
  fileKey: string;
  ipfsHash: string;
};

const DownloadFilePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DownloadFileArgs>();

  const onSubmit: SubmitHandler<DownloadFileArgs> = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/file?fileKey=${data.fileKey}&ipfsHash=${data.ipfsHash}`,
        { responseType: "blob" }
      );
      const fileNameHeader = "x-suggested-filename";
      const suggestedFileName = response.headers[fileNameHeader];
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", suggestedFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Download started");
    } catch (e) {
      if (e instanceof AxiosError) {
        const blob = e.response!.data as Blob;
        const text = await blob.text();
        toast.error(await e.response?.data.text());
      }
    }
  };

  return (
    <>
      <Head>
        <title>Download a file - Blockchain project</title>
        <meta name="description" content="Blockchain project meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col className="d-flex aling-items-center">
            <h1>Download a file</h1>{" "}
          </Col>
        </Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>IPFS hash</Form.Label>
                <Form.Control {...register("ipfsHash")} type="text" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>File key</Form.Label>
                <Form.Control {...register("fileKey")} type="text" />
              </Form.Group>
            </Row>
            <Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Row>
            <Row></Row>
          </Form>
        </Col>
      </Container>
    </>
  );
};

export default DownloadFilePage;
