import axios from "axios";

// promise , callback function , async/await
export const getAllTeamApi = async () => {
    try {
        const res = await axios({
            method: "GET", // GET , POST , PUT , DELETE
            url: "http://45.120.81.98:4454/api/v1/teams",
        });
        return res.data;
    } catch (error) {
        console.log(error.response.data);
    }
};

// promise , callback function , async/await
export const getAllMatchTeamApi = async () => {
    const res = await axios({
        method: "GET", // GET , POST , PUT , DELETE
        url: "http://45.120.81.98:4454/api/v1/match-teams",
    });
    return res.data;
};

export const getAllSeasonApi = async () => {
    const res = await axios({
        method: "GET", // GET , POST , PUT , DELETE
        url: "http://45.120.81.98:4454/api/v1/seasons",
    });
    return res.data;
};

export const getAllMatchesInSeasonApi = async (id) => {
    try {
        const res = await axios({
            method: "GET", // GET , POST , PUT , DELETE
            url: `http://45.120.81.98:4454/api/v1/seasons/index-teams/${id}`,
        });
        return res.data;
    } catch (error) {
        console.log(error.response.data);
    }
};

export const getAllMatchApi = async (id) => {
    const res = await axios({
        method: "GET", // GET , POST , PUT , DELETE
        url: `http://45.120.81.98:4454/api/v1/matches`,
    });
    return res.data;
};
