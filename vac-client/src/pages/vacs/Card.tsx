
import { Button } from '@mui/material';

import { RootState } from '../../redux_features/store'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'


import { Loader } from '../../components/loader';
import { EditVacation } from './editVacation';
import LikeCard from './likeCard';
import { ButtonEditor } from './button';


function Card(props: any) {
    const [selectedEditMode, setSelectedEditMode] = useState(false);

    const userRoleGlobal = useSelector((state: RootState) => state.userData.userRole)
    const userNameGlobal = useSelector((state: RootState) => state.userData.userName)
    const { id, destination, description, picture, date_start, date_end, price, deleteHandle, followHandle, followHandleOff } = props
    const [showAdminUi, setshowAdminUi] = useState(false)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (userRoleGlobal === "admin") {
            setshowAdminUi(true)
            setLoader(false)
        } else {
            setshowAdminUi(false)
            setLoader(false)
        }
    }, [userRoleGlobal, userNameGlobal]);

    return (
      <>
        <div className="col  m6 l3 xl3 ">
          <div className="card ">
            {!loader ? (
              <div>
                {selectedEditMode ? (
                  <div>
                    <EditVacation
                      id={id}
                      selectedEditMode={selectedEditMode}
                      setSelectedEditMode={setSelectedEditMode}
                      currentData={{
                        destination,
                        description,
                        picture,
                        date_start,
                        date_end,
                        price,
                        deleteHandle,
                        followHandle,
                        followHandleOff,
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <h5 className="center-align">{destination}</h5>
                    <div className="row">
                      <div className="col s12 m13">
                        <div className="card">
                          <h6>
                            {" "}
                            From: <b>{date_start.slice(-24, -14)}</b>
                          </h6>
                          <h6>
                            To: <b>{date_end.slice(-24, -14)}</b>
                          </h6>
                          <h6>
                            Price: <b>{price} $</b>
                          </h6>
                          <div className="card-image ">
                            <img className="cardImage" src={picture} />
                          </div>
                          <div className="card-content ">
                            <p>
                              {" "}
                              <div className="overflow">
                                {" "}
                                {description}{" "}
                              </div>{" "}
                            </p>
                           
                          </div>
                        </div>
                        {showAdminUi ? null : (
                          <LikeCard
                            id={id}
                            followHandle={followHandle}
                            followHandleOff={followHandleOff}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  {showAdminUi ? (
                    <div>
                      <div className="deleteAdminBtn">
                        <Button
                          variant="outlined"
                          onClick={() => deleteHandle(id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <ButtonEditor
                        setSelectedEditMode={setSelectedEditMode}
                        selectedEditMode={selectedEditMode}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </>
    );
}

export { Card };