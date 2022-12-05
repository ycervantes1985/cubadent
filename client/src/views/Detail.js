import React from 'react';
import { useEffect, useState, useRef } from 'react';
import {useParams,useNavigate,Link} from "react-router-dom"
import { simpleGet } from '../services/simpleGet';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words'
import { Card, Col, Row } from 'antd';



const Detail = () => {

    const {id} = useParams()
    const [tratamientos, setTratamientos] = useState()
    const [paciente, setPaciente] = useState()
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
      clearFilters();
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


    const getPaciente = async() => {
        const response = await simpleGet("http://localhost:8000/api/paciente/" + id)
        setPaciente(response.data.paciente)        
    }


    const getPacienteT = async() => {
        const response = await simpleGet("http://localhost:8000/api/paciente/tratamiento/" + id)
        setTratamientos(response.data.tratamientos)        
    }

    useEffect(() => {
        getPacienteT()
        getPaciente() 
    
    }, []);

    const goToBack = () =>{navigate(`/home`)}

    const addTratamiento = id =>{  navigate(`/add-tratamiento/${id}`)  }

    function sortByDate(a, b) {
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        return 0;
    }
    tratamientos?.sort(sortByDate)

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'createdAt',
            key: 'fecha',
            width: '30%',
            ...getColumnSearchProps('createdAt'),
            render: (createdAt) => {
            return (
                <div> 
                    <p>{moment(createdAt).format("DD-MM-YYYY hh:mm:ss")}</p>
                </div>
            );
            },
        },
        
        {
            title: 'Descripcion',
            dataIndex: 'descripcion',
            key: 'descripcion',
            ...getColumnSearchProps('descripcion'),
        },
        {
            title: 'Estatus',
            dataIndex: 'estatus',
            key: 'estatus',
            width: '20%',
            ...getColumnSearchProps('estatus'),
        },          
        
]; 
    


    return (
        <div>
            <div>                
                {paciente &&
                <div>
                    <div className='detail-top'>
                        <div>
                            <h2>{paciente.name} {paciente.apellidos}</h2>
                        </div>
                        <div>                    
                            <h2 className='emergencia'>{paciente.telefonoEm}</h2>
                            
                        </div>                     
                    </div> 
                <div >
                        <div className="preexistencias-top">
                            <Row gutter={16}>
                            <Col span={8}>
                                <Card title="Enfermedades" bordered={false}>
                                    {paciente.antecedentesEnfermedades}
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="Tratamiento Medico" bordered={false}>
                                    {paciente.tratamientoMedico}
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="Alergias" bordered={false}>
                                    {paciente.alergias} 
                                </Card>
                            </Col>
                            </Row>
                        </div>
                    
                </div>  
            </div>                       
                }
            </div>
            <div>
                <Table columns={columns} dataSource={tratamientos} size='small' />            
                <Button onClick={goToBack}>Volver</Button> 
                <Button variant='success' onClick={() => addTratamiento(paciente._id)}>Adicionar</Button>
            </div>
            
        </div>
    );
}

export default Detail;
