import { Button, Grid, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import  Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert, Card } from "reactstrap";
import CommonLayout from "../../containers/common/common-layout";
import { Store } from "../../utils/Store";
import useStyles from "./style";
import NextLink from 'next/link';
import { BASE_URL } from "../../constant/constants";
import { useRouter } from "next/router";


export default function OrderHistory() {
  const router = useRouter();
  const { state } = useContext(Store);
  const {userInfo} = state;
  const classes = useStyles();
  const [orders ,Setorders]=useState([]);
  
  const fetchData = async () => {
     
     
    await Axios.get(
     BASE_URL+`orders/mine/`+userInfo._id,

     ).then( res => {
      
       Setorders(res.data);
       console.log(res.data);
       
        
      });
  
 
};
  useEffect(() => {
   
   
    if (!userInfo) {
        return Alert("Go To Sign In")
        router.push('/')
    

      }else{
        fetchData();
      }
  }, [userInfo]);
  return (

 
              
    <CommonLayout>
      { !userInfo?
       <div>
       <h1 className="text-center black my-0" >Please Go To Login</h1>
   </div> :
      
      <center>
     <Grid item md={9} xs={12} className="my-5">
          <Card >
            <List>
               
              <ListItem>
                
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>DATE</TableCell>
                          <TableCell>TOTAL</TableCell>
                          <TableCell>PAID</TableCell>
                          <TableCell>DELIVERED</TableCell>
                          <TableCell>ACTION</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell>{order._id.substring(20, 24)}</TableCell>
                            <TableCell>{order.createdAt.split('T')[0]}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell>
                              {order.isPaid
                                ? `paid at ${order.paidAt.split('T')[0]}`
                                : 'not paid'}
                            </TableCell>
                            <TableCell>
                              {order.isDelivered
                                ? `delivered at ${order.deliveredAt}`
                                : 'not delivered'}
                            </TableCell>
                            <TableCell>
                            <NextLink href={`/order/${order._id}`} passHref>
                                <Button variant="contained">Details</Button>
                              </NextLink>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                 
              </ListItem>
            </List>
          </Card>
        </Grid>
        </center>
}
     </CommonLayout>

  )

  

}