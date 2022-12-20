import React, { useEffect, useState, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useUser } from "../contexts/userContext";
import { deletePaciente } from "../services/paciente-service"
import { simpleGet } from '../services/simpleGet'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words'
import Swal from 'sweetalert2'



function Home() {

    const {user,setUser} = useUser();
    const [pacientes, setPaciente] = useState();
    const navigate = useNavigate()
    

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters({ confirm: true })
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
            style={{
            padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
        >
            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{
                marginBottom: 8,
                display: 'block',
            }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                width: 90,
            }}
            >
                Search
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                width: 90,
            }}
            >
                Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                confirm({
                closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
            }}
            >
            Filter
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                close();
                }}
            >
                close
            </Button>
            </Space>
        </div>
        ),
        filterIcon: (filtered) => (
        <SearchOutlined
            style={{
            color: filtered ? '#1890ff' : undefined,
            }}
        />
        ),
        onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
        },
        render: (text) =>
        searchedColumn === dataIndex ? (
        <Highlighter
            highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
        />
        ) : (
        text
        ),
    });



    useEffect(() => {
        traerPacientes()
}, []);   

const traerPacientes = async() =>{
    const response = await simpleGet("http://localhost:8000/api/paciente")
    console.log(response)
    setPaciente(response.data.pacientes)
}

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Rut',
      dataIndex: 'rut',
      key: 'rut',
      width: '20%',
      ...getColumnSearchProps('rut'),
    },
    {
      title: 'Telefono',
      dataIndex: 'telefono',
      key: 'telefono',
      ...getColumnSearchProps('telefono')
      
    },
    {
        title: 'Actions',   
        dataIndex: '_id',     
        render: (record) =>{
            return (
                <>
                <Link to={'/paciente/tratamiento/'+record} style={{ marginRight:15}}>Tratamientos</Link>
                <EditOutlined onClick={()=>{
                    onEditPaciente(record)
                }}></EditOutlined>
                <DeleteOutlined onClick={()=>{
                    onDeletePaciente(record)
                }} style={{color:"red", marginLeft:15}}></DeleteOutlined>
                </>
            )
        },      
    
    },
];


const onDeletePaciente = async (record) =>{
    try {
        await deletePaciente(record);
        setPaciente(pacientes.filter(paciente => paciente._id !== record));
        Swal.fire('Se ha eliminado un paciente')
    } catch(err) {
            console.log("Error", err)
    }


}

const onEditPaciente = async (record) =>{
    navigate (`/edit-paciente/${record}`)
}


return (
    <div>  
        
    {user &&     
    <Table columns={columns} dataSource={pacientes} />
    }  
    </div>
)
}

export default Home