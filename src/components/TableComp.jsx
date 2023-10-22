import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { getRegister } from "../redux/register/Action";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableComp = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.register);
  const rows = data.registers;
  //console.log(data.isLoading);
  useEffect(() => {
    dispatch(getRegister());
  }, []);

  console.log(rows?.data);

  // const downloadfile = (file) => {
  //   const link = document.createElement("a");

  //   // Set the href attribute to the file you want to download
  //   link.href = "../../public/files/" + file; // Replace with the actual file URL

  //   // Set the download attribute to specify the file name
  //   link.download = file; // Replace with the desired file name

  //   // Trigger a click event to start the download
  //   link.click();
  // };
  return (
    <section className="mt-2">
      <Container>
        <Row lg={12} md={12} sm={12} xs={12}>
          <Col>
            {!rows.data ? (
              <CircularProgress className="circular" />
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Sr.No</StyledTableCell>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">DOB</StyledTableCell>
                      <StyledTableCell align="center">State</StyledTableCell>
                      <StyledTableCell align="center">Gender</StyledTableCell>
                      <StyledTableCell align="center">Hobbies</StyledTableCell>
                      <StyledTableCell align="center">Address</StyledTableCell>
                      <StyledTableCell align="center">Resume</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.data &&
                      rows.data.map((ele, index) => {
                        return (
                          <StyledTableRow key={ele._id}>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {ele.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {ele.dob}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {ele.state}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {ele.gender}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {ele.hobbies}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {ele.address}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Link
                                to={`http://localhost:8001/uploads/${ele.resume}`}
                                className="downloadbtn"
                              >
                                Download File
                              </Link>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TableComp;
