import { useEffect, useState } from 'react'

import axiosInstance from '../../server/index.axios'
import { Navigate } from 'react-router-dom'
import { RootState, AppDispatch } from '../../redux_features/store'
import { useSelector, useDispatch, } from 'react-redux'
import { setVcData } from '../../redux_features/vacations/vacationsDataSlice'
import { setUserName, resetUserName, setUserRole, resetUserRole } from '../../redux_features/users/vacationsUserDataSlice'

import { Loader } from '../../components/loader'
import { CardList } from './cardList'
import { Paginat } from './pagination'
import Switcher from './switcher'

function Vacations() {
    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage, setCardsPerPage] = useState(8)

    const inputDataRedux = useSelector((state: RootState) => state.vcData.data)
    const filterRedux = useSelector((state: RootState) => state.filter.filtered)
    const dataStatus = useSelector((state: RootState) => state.vcData.status)

    const globalUserName = useSelector((state: RootState) => state.userData.userName)
    const userRole = useSelector((state: RootState) => state.userData.userRole)

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (filterRedux === true) {
            setCurrentPage(1)
            fetchVacationFiltered()
        } else {
            setCurrentPage(1)
            dataFetch()
        }
    }, [filterRedux, dataStatus]);

    useEffect(() => {
        getUserData()
        console.log(globalUserName)
    }, [globalUserName, userRole]);

    const dataFetch = async () => {
        try {
            const { data } = await axiosInstance.get(`http://localhost:3500/vacations`)
            console.log(data)
            dispatch(setVcData(data))
            return data
        } catch (err) {
            console.log(err)
        }
    }

    const fetchVacationFiltered = async () => {
        try {
            const { data } = await axiosInstance.get(`http://localhost:3500/vacations/filtered/`)
            if (!data[0]) return dataFetch()
            dispatch(setVcData(data))
            return data
        } catch (err) {
            console.log(err)
        }
    }

    const deleteHandle = async (id: any) => {
        try {
            const { data } = await axiosInstance.delete(`http://localhost:3500/vacations/${id}`)
            dataFetch()
            return data
        } catch (err) {
            console.log(err)
        }
    }

    const followHandle = async (id: any) => {
        try {
            const { data } = await axiosInstance.post(`http://localhost:3500/vacations/follow/${id}`)
            dataFetch()
            return data
        } catch (err) {
            console.log(err)
        }
    }

    const followHandleOff = async (id: any) => {
        try {
            const { data } = await axiosInstance.delete(`http://localhost:3500/vacations/follow/${id}`)

            return data
        } catch (err) {
            console.log(err)
        }
    }

    const getUserData = async () => {
        try {
            const { data } = await axiosInstance.get(`http://localhost:3500/vacations/userData`)
            dispatch(setUserName(data.userName))
            dispatch(setUserRole(data.role))

         
            return data
        } catch (err) {
            console.log(err)
        }
    }

    function getTokenLS() {
        return localStorage.getItem("token")
    }

    

    const indexOfLastCard = currentPage * cardsPerPage
    const indexOfFirstCard = indexOfLastCard - cardsPerPage
    const currentCards = inputDataRedux.slice(indexOfFirstCard, indexOfLastCard)

    

    const paginate = (pageNumber: any) => setCurrentPage(pageNumber)

    if (typeof getTokenLS() !== "string") return <Navigate to="/" />;
    return (
        <>
            <div className='cardsLogo'>
                {userRole === "user" ? <Switcher /> : null}
                <div className="container">
                    <h3 className="center-align">Vacations</h3>
                </div>
            </div>

            <div className="row">
                {!currentCards.length ? <Loader /> : <CardList catalog={currentCards}
                    deleteHandle={deleteHandle} followHandle={followHandle} followHandleOff={followHandleOff} />}
            </div>
            <div >
                <Paginat cardsPerPage={cardsPerPage} totalCards={inputDataRedux.length} paginate={paginate} />
            </div>
        </>
    );
}

export { Vacations };