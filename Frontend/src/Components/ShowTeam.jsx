import React, { useEffect, useState } from "react";
import axios from "axios";
import LineUp from "../Components/LineUp"; // Assuming this is a component to display the team lineup
import { useParams, NavLink } from "react-router-dom";
import { Button, Flex } from "@radix-ui/themes";
import "../style/Team.css";

function ShowTeam() {
    const { username, leagueCode } = useParams(); // Get the username and leagueCode from URL params
    const [players, setPlayers] = useState([]);
    const [isPlayers, setIsPlayers] = useState(false);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const response = await axios.post("/users/getTeamPlayers", {
                    username: username,
                });
                const data = response.data;
        
                console.log("API response data:", data);

                // Find the league with the given leagueCode
                const league = data.find(league => league.league_code === parseInt(leagueCode));
                if (league && league.players) {
                    setPlayers(league.players); // Set the players array
                    setIsPlayers(true);
                } else {
                    console.error("No players found for this league code:", data);
                    setIsPlayers(false);
                }
            } catch (error) {
                console.log("Error fetching team data:", error);
                setIsPlayers(false);
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        getPlayers();
    }, [username, leagueCode]);

    console.log("Players state:", players);

    return (
        <div className="team">
            {loading ? (
                <div>Loading...</div> // Show loading until API call is complete
            ) : isPlayers ? (
                <Flex direction={'column'}>
                    <h2>Team of: {username} in League: {leagueCode}</h2>
                    <LineUp
                        isCreate={false} // Since we're just showing the team, not creating/editing
                        players={players}
                        setPlayers={setPlayers}
                    />
                    <NavLink to="/leagues">
                        <Button color="gray" variant="solid" highContrast>
                            Back to Leagues
                        </Button>
                    </NavLink>
                </Flex>
            ) : (
                <div>No players found for this league.</div> // Inform if no players were found
            )}
        </div>
    );
}

export default ShowTeam;
