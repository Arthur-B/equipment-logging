import React, { Component } from "react";
import { Table } from "reactstrap";

import NewDepositionModal from "./NewDepositionModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

class DepositionList extends Component {
    render() {
        const depositions = this.props.depositions;
        return (
            <Table>
                <thead>
                    <tr>
                        <th> Day </th>
                        <th> User </th>
                        <th> Material </th>
                        <th> Power (W) </th>
                        <th> Pressure (mTorr) </th>
                        <th> MFC flow (sccm) </th>
                        <th> Deposition time </th>
                        <th> Thickness (nm) </th>
                        <th> Comment </th>
                        <th> Operations </th>
                    </tr>
                </thead>
                <tbody>
                    {!depositions || depositions.length <= 0 ? (
                        <tr>
                            <td colSpan="10" align="center">
                                <b>No available data</b>
                            </td>
                        </tr>
                    ) : (
                        depositions.map(deposition => (
                            <tr key={deposition.id}>
                                
                                <td>{deposition.day}</td>
                                <td>{deposition.user}</td>
                                <td>{deposition.material}</td>
                                <td>{deposition.power}</td>
                                <td>{deposition.pressure}</td>
                                <td>{deposition.mfc_flow}</td>
                                <td>{deposition.deposition_time}</td>
                                <td>{deposition.thickness}</td>
                                <td>{deposition.comment}</td>
                                
                                <td align="center">
                                    <NewDepositionModal
                                        create={false}
                                        deposition={deposition}
                                        resetState={this.props.resetState}
                                    />
                                    &nbsp;&nbsp;
                                    <ConfirmRemovalModal
                                        id={deposition.id}
                                        resetState={this.props.resetState}
                                    />
                                </td>
                            </tr>  
                        ))
                    )}
                </tbody>
            </Table>
        );
    }
}

export default DepositionList