// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//     Container,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
// } from "@mui/material"

// function ProfileId() {
//     // const { id } = useParams();
//     const [profile, setProfiles] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState();
  
//     useEffect(() => {
//       fetchProfiles();
//     }, []);
  
//     const fetchProfiles = () => {
//       axios
//         .get(`http://localhost:3001/api/profiles/${id}`)
//         .then((response) => {
//           setProfiles(response.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.log(error);
//           setLoading(false);
//         });
//     };
//     return (
//         <Container>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {profile.map((profile) => (
//                   <TableRow key={profile.id}>
//                     <TableCell>{profile.id}</TableCell>
//                     <TableCell>{profile.name}</TableCell>
//                     <TableCell>{profile.email}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Container>
    
//       );
// };

// export default ProfileId

import React, { useEffect, useState, useParams } from "react";
import axios from "axios";

import { 
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
 } from "@mui/material"

function ProfileId() {
  const { id } = useParams();
  const [profileid, setProfileId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileId();
  }, []);

  const fetchProfileId = () => {
    axios
      .get(`http://localhost:3001/api/db/${id}`)
      .then((response) => {
        setProfileId(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell  >ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profileid.map((profileid) => (
              <TableRow key={profileid.id}>
                <TableCell>{profileid.id}</TableCell>
                <TableCell>{profileid.name}</TableCell>
                <TableCell>{profileid.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>

  );
}

export default ProfileId;
