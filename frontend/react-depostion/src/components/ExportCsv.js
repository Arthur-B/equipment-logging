import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import { CSVLink } from "react-csv";

class ExportCsv extends Component {
    render() {
        const depositions = this.props.depositions; // Only get the last 10 depositions
        
        const tableHeaders = [
            { label: "id", key: "id"},
            { label: "Day", key: "day" },
            { label: "User", key: "user" },
            { label: "Material", key: "material" },
            { label: "Power (W)", key: "power" },
            { label: "Pressure (mTorr)", key: "pressure" },
            { label: "MFC flow (sccm)", key: "mfc_flow" },
            { label: "Deposition time", key: "deposition_time"},
            { label: "Thickness (nm)", key: "thickness" },
            { label: "Comment", key: "comment" },
        ];

        const filename = "sputter_RF_log.csv"

        return (
            <Fragment>
                <CSVLink 
                    data={depositions}
                    headers={tableHeaders}
                    filename={filename}
                >
                    <Button
                        color="secondary"
                        style={{ minWidth: "200px"}}
                    >
                        Export to CSV
                    </Button>
                </CSVLink>
            </Fragment>
        );
    }
}

export default ExportCsv