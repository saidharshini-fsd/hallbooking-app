const express = require("express")
const app = express()
const PORT = 8000

app.use(express.json())

// datas for api
var data = [
  {
    id: 1,
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "true",
    customerName: "Sanjay",
    date: "05-feb-2022",
    startTime: "10-feb-2022 at 12PM",
    endTime: "11-feb-2020 at 11am",
    RoomId: 201,
    RoomName: "Duplex",
  },
  {
    id: 2,
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 202,
    RoomName: "Duplex",
  },
  {
    id: 3,
    numberOfSeats: 150,
    amenities: ["Ac", "chairs", "discolights"],
    price: 3000,
    ifBooked: "true",
    customerName: "swetha",
    date: "06-feb-2022",
    startTime: "10-feb-2022 at 12PM",
    endTime: "11-feb-2020 at 11am",
    RoomId: 203,
    RoomName: "Suite",
  },
  {
    id: 4,
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 22000,
    ifBooked: "true",
    customerName: "Sai",
    date: "06-feb-2022",
    startTime: "10-feb-2022 at 12PM",
    endTime: "11-feb-2020 at 11am",
    RoomId: 204,
    RoomName: "Suite",
  },
  {
    id: 5,
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 202,
    RoomName: "Duplex",
  }
];

var editableData = data

//full customer details
//Endpoint - http://localhost:8000/hallbooking/customerdetail


app.get("/hallbooking/customerdetail",(req,res)=>{

    try {
        let customerData = editableData
        let list = customerData.filter(halls=>halls.ifBooked == 'true')
        let customerlist=[]
        if(list.length !== 0){
            list.map((data)=>{
                let customlist={
                    customerName: data.customerName,
                    RoomName: data.RoomName,
                    date: data.date,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    BookingId: data.id,
                    BookingDate: data.date,
                    BookingStatus: data.ifBooked
                }
                customerlist.push(customlist)
            })
            res.status(200).send(customerlist)
        }else{
            res.status(200).send({message : "No curtomer are there"})
        }
        
    } catch (error) {
        res.status(500).send({message : "Internal Server Error",error})
    }
})

//all booked customer details
//Endpoint - http://localhost:8000/hallbooking/customerlist

app.get("/hallbooking/customerlist",(req,res)=>{

    try {
        let customerData = editableData
        let list = customerData.filter(halls=>halls.ifBooked == 'true')
        let customerlist=[]
        if(list.length !== 0){
            list.map((data)=>{
                let customlist={
                    customerName: data.customerName,
                    RoomName: data.RoomName,
                    date: data.date,
                    startTime: data.startTime,
                    endTime: data.endTime
                }
                customerlist.push(customlist)
            })
            res.status(200).send(customerlist)
        }else{
            res.status(200).send({message : "No curtomer are there"})
        }
        
    } catch (error) {
        res.status(500).send({message : "Internal Server Error",error})
    }
})

//all booked room details
//Endpoint - http://localhost:8000/hallbooking/roomlist

app.get("/hallbooking/roomlist",(req,res)=>{

    try {
        let roomData = editableData
        let list = roomData.filter(halls=>halls.ifBooked == 'true')
        let roomlist=[]
        if(list.length !== 0){
            list.map((data)=>{
                let customlist={
                    RoomName: data.RoomName,
                    ifBooked: data.ifBooked,
                    customerName: data.customerName,
                    date: data.date,
                    startTime: data.startTime,
                    endTime: data.endTime
                }
                roomlist.push(customlist)
            })
            res.status(200).send(roomlist)
        }else{
            res.status(200).send({message : "No Room was booked"})
        }
        
    } catch (error) {
        res.status(500).send({message : "Internal Server Error",error})
    }
})

//Creating a room
//Endpoint - http://localhost:8000/hallbooking/createroom


app.post("/hallbooking/createroom",(req,res)=>{
    try {
        let room ={
            id: data.length+1,
            numberOfSeats: req.body.numberOfSeats,
            amenities: req.body.amenities,
            price: req.body.price,
            ifBooked: "false",
            customerName: "",
            date: "",
            startTime: "",
            endTime: "",
            RoomId: editableData.length+201,
            RoomName: req.body.RoomName
          }
          editableData.push(room)
          res.status(200).send({message:"Sucessfully Room Created"})
    } catch (error) {
        res.status(500).send({message : "Internal Server Error",error})
    }
})

//Booking a room
//Endpoint - http://localhost:8000/hallbooking/bookingroom


app.put("/hallbooking/bookingroom",(req,res)=>{
    try {
        let roomId =req.body.RoomId
        let bookingRoom = editableData.find(data => data.RoomId == roomId)
        let idNum =bookingRoom.id
        if(req.body.ifBooked){
            res.status(400).send({message:"Room is already Booked"})
        }else{
            editableData[idNum-1].ifBooked="true",
            editableData[idNum-1].customerName = req.body.customerName,
            editableData[idNum-1].date =  req.body.date,
            editableData[idNum-1].startTime =  req.body.startTime,
            editableData[idNum-1].endTime =  req.body.endTime,
            res.status(200).send({message:"Sucessfully Room Booked"})
        }
    } catch (error) {
        res.status(500).send({message : "Internal Server Error",error})
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})