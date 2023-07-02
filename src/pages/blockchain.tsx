import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const BlockchainPage = () => {
  const [responseData, setResponseData] = useState<any[]>();
  useEffect(() => {
    if (!responseData) {
      axios.get("http://localhost:8081/api/blockchain").then((response) => {
        setResponseData(response.data);
      });
    }
  }, []);

  if (!responseData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Blockchain index - Blockchain project</title>
        <meta name="description" content="Blockchain project meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <h1>Blockchain visualization</h1>
        </Row>
        {responseData.map((block, index) => (
          <Row key={block.blockIndex}>
            <Card>
              <Card.Body>
                <Card.Title>Block #{block.blockIndex}</Card.Title>
                <Card.Text>
                  Block hash: {block.blockHash} <br />
                  File hash: {block.fileHash}
                  <br />
                  File ID: {block.fileId} <br />
                  Owner:{" "}
                  {block.fileOwner === "N.A"
                    ? "Genesis block"
                    : block.fileOwner}{" "}
                  <br />
                  IPFS hash: {block.fileValues}
                  <br />
                  Nonce: {block.nonce} <br />
                  Previous hash: {block.previousHash} <br />
                  Timestamp: {block.timestamp} <br />
                </Card.Text>
              </Card.Body>
            </Card>
            {index + 1 < responseData.length && (
              <FontAwesomeIcon size="4x" icon="arrow-down" />
            )}
          </Row>
        ))}
      </Container>
    </>
  );
};

export default BlockchainPage;
