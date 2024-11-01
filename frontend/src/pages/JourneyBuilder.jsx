import React, { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import axios from 'axios';

const Journey = () => {
    const discordAuthUrl = import.meta.env.VITE_DISCORD_AUTH_URL;
    const vite_validate_url = import.meta.env.VITE_VALIDATE_URL;
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('user')) {
            window.location.href = discordAuthUrl;
        }

        const id = sessionStorage.getItem('user');
        if (id) {
            axios.post(`${vite_validate_url}/check-id`, {
                id: JSON.parse(id).id,
            })
                .then(response => {
                    if (response.data && response.data.exists) {
                        setValid(true);
                    } else {
                        setValid(false);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    const initialScenario = {
        1: {
            Scenario_Text: '',
            Category: [''],
            Image: '',
            Choices: {
                'Example Choice': {
                    success: {
                        response: "Enter a success response here...",
                        health_reward: null,
                        health_penalty: null,
                        reward: [],
                        probability: 0.5,
                    },
                    failure: {
                        response: "Enter a failure response here...",
                        health_penalty: null,
                        reward: [],
                        probability: 0.5,
                    },
                }
            }
        }
    };

    const [scenarioData, setScenarioData] = useState(initialScenario);
    const [newScenario, setNewScenario] = useState({ Scenario_Text: '', Category: [''], Image: '', Choices: {} });
    const [newChoiceName, setNewChoiceName] = useState('');
    const [newChoiceSuccessResponse, setNewChoiceSuccessResponse] = useState('');
    const [newChoiceFailureResponse, setNewChoiceFailureResponse] = useState('');

    const handleInputChange = (id, field, value) => {
        setScenarioData(prevData => ({
            ...prevData,
            [id]: {
                ...prevData[id],
                [field]: value,
            }
        }));
    };

    const handleChoiceChange = (id, choiceName, field, value) => {
        setScenarioData(prevData => ({
            ...prevData,
            [id]: {
                ...prevData[id],
                Choices: {
                    ...prevData[id].Choices,
                    [choiceName]: {
                        ...prevData[id].Choices[choiceName],
                        [field]: {
                            ...prevData[id].Choices[choiceName][field],
                            ...value // Spread to update the success or failure fields
                        }
                    }
                }
            }
        }));
    };

    const handleAddScenario = () => {
        const newId = Object.keys(scenarioData).length + 1; // Generate new ID
        setScenarioData(prevData => ({
            ...prevData,
            [newId]: { ...newScenario } // Add new scenario
        }));
        setNewScenario({ Scenario_Text: '', Category: [''], Image: '', Choices: {} }); // Reset new scenario input
    };

    const handleAddChoice = (id) => {
        if (!newChoiceName) return; // Do nothing if choice name is empty
        setScenarioData(prevData => ({
            ...prevData,
            [id]: {
                ...prevData[id],
                Choices: {
                    ...prevData[id].Choices,
                    [newChoiceName]: {
                        success: { response: newChoiceSuccessResponse, health_reward: null, health_penalty: null, reward: [], probability: 0.5 },
                        failure: { response: newChoiceFailureResponse, health_penalty: null, reward: [], probability: 0.5 },
                    }
                }
            }
        }));
        setNewChoiceName(''); // Reset choice name
        setNewChoiceSuccessResponse(''); // Reset success response
        setNewChoiceFailureResponse(''); // Reset failure response
    };

    const handleEditChoiceName = (scenarioId, oldChoiceName, newChoiceName) => {
        if (oldChoiceName !== newChoiceName) {
            setScenarioData(prevData => {
                const { [scenarioId]: scenario, ...rest } = prevData;
                const { [oldChoiceName]: oldChoice, ...remainingChoices } = scenario.Choices;

                return {
                    ...rest,
                    [scenarioId]: {
                        ...scenario,
                        Choices: {
                            ...remainingChoices,
                            [newChoiceName]: { // Add the choice with the new name
                                ...oldChoice,
                            },
                        }
                    }
                };
            });
        }
    };

    const handleDeleteScenario = (id) => {
        setScenarioData(prevData => {
            const { [id]: _, ...remainingScenarios } = prevData; // Remove the scenario by destructuring
            return remainingScenarios; // Return remaining scenarios
        });
    };

    const handleDeleteChoice = (scenarioId, choiceName) => {
        setScenarioData(prevData => ({
            ...prevData,
            [scenarioId]: {
                ...prevData[scenarioId],
                Choices: {
                    ...Object.fromEntries(
                        Object.entries(prevData[scenarioId].Choices).filter(([key]) => key !== choiceName)
                    ) // Filter out the choice to delete
                }
            }
        }));
    };

    const handleSave = () => {
        console.log("Updated Scenario Data:", JSON.stringify(scenarioData, null, 2));
    };

    const handleDownloadJSON = () => {
        const dataStr = JSON.stringify(scenarioData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'scenarios.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up URL.createObjectURL
    };

    return (
        <div className="App">
            <NavBar />
            <section className="journey">
                <div className="flex flex-col gap-16 mb-16 text-left">
                    {valid ? (
                        <>
                            <h1 className="font-extrabold text-text-primary text-left max-w-screen-sm" style={{ fontSize: "48px" }}>Journey Builder</h1>
                            <div className="form-container">
                                {Object.entries(scenarioData).map(([id, scenario]) => (
                                    <div key={id} className="scenario-edit mb-4 border border-secondary p-4">
                                        <h2>Scenario {id}</h2>
                                        <button className="btn btn-danger mb-3" onClick={() => handleDeleteScenario(id)}>Delete Scenario</button>
                                        <div className="mb-3">
                                            <label>Scenario Text</label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Describe the scenario..."
                                                value={scenario.Scenario_Text || ''}
                                                onChange={e => handleInputChange(id, 'Scenario_Text', e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Category</label>
                                            <input
                                                className="form-control"
                                                placeholder="Enter category (comma separated)..."
                                                value={scenario.Category.join(', ') || ''}
                                                onChange={e => handleInputChange(id, 'Category', e.target.value.split(', '))}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Image URL</label>
                                            <input
                                                className="form-control"
                                                placeholder="https://example.com/image.png"
                                                value={scenario.Image || ''}
                                                onChange={e => handleInputChange(id, 'Image', e.target.value)}
                                            />
                                        </div>
                                        <h3>Choices</h3>
                                        {Object.entries(scenario.Choices).map(([choiceName, choice]) => (
                                            <div key={choiceName} className="choice-edit mb-3 bg-secondary py-3 px-3">
                                                <h4>
                                                    <input
                                                        className="form-control"
                                                        value={choiceName}
                                                        onChange={e => handleEditChoiceName(id, choiceName, e.target.value)}
                                                    />
                                                </h4>
                                                <button className="btn btn-danger mb-2" onClick={() => handleDeleteChoice(id, choiceName)}>Delete Choice</button>
                                                <div className="mb-3 ms-4">
                                                    <label>Success Response</label>
                                                    <input
                                                        className="form-control"
                                                        placeholder="Describe the success response..."
                                                        value={choice.success.response || ''}
                                                        onChange={e => handleChoiceChange(id, choiceName, 'success', { ...choice.success, response: e.target.value })}
                                                    />
                                                </div>
                                                <div className="mb-3 ms-4">
                                                    <label>Health Reward</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="Enter health reward..."
                                                        value={choice.success.health_reward ?? ''}
                                                        onChange={e => handleChoiceChange(id, choiceName, 'success', { ...choice.success, health_reward: e.target.value ? Number(e.target.value) : null })}
                                                    />
                                                </div>
                                                <div className="mb-3 ms-4">
                                                    <label>Health Penalty</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="Enter health penalty..."
                                                        value={choice.success.health_penalty ?? ''}
                                                        onChange={e => handleChoiceChange(id, choiceName, 'success', { ...choice.success, health_penalty: e.target.value ? Number(e.target.value) : null })}
                                                    />
                                                </div>
                                                <div className="mb-3 ms-4">
                                                    <label>Reward</label>
                                                    <input
                                                        className="form-control"
                                                        placeholder="Enter reward (comma separated)..."
                                                        value={choice.success.reward.join(', ') || ''}
                                                        onChange={e => handleChoiceChange(id, choiceName, 'success', { ...choice.success, reward: e.target.value.split(', ') })}
                                                    />
                                                </div>
                                                <div className="mb-3 ms-4">
                                                    <label>Probability</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="0.5 (50% chance)"
                                                        value={choice.success.probability}
                                                        onChange={e => handleChoiceChange(id, choiceName, 'success', { ...choice.success, probability: Number(e.target.value) })}
                                                    />
                                                </div>
                                                <div className="mb-3 ms-4">
                                                    <label>Failure Response</label>
                                                    <input
                                                        className="form-control"
                                                        placeholder="Describe the failure response..."
                                                        value={choice.failure.response || ''}
                                                        onChange={e => handleChoiceChange(id, choiceName, 'failure', { ...choice.failure, response: e.target.value })}
                                                    />
                                                </div>
                                                <div className="mb-3 ms-4">
                                                    <label>Health Penalty (Failure)</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="Enter health penalty..."
                                                        value={choice.failure.health_penalty ?? ''}
                                                        onChange={e => handleChoiceChange(id, choiceName, 'failure', { ...choice.failure, health_penalty: e.target.value ? Number(e.target.value) : null })}
                                                    />
                                                </div>
                                                <div className="mb-3 ms-4">
                                                    <label>Reward (Failure)</label>
                                                    <input
                                                        className="form-control"
                                                        placeholder="Enter reward (failure) (comma separated)..."
                                                        value={choice.failure.reward.join(', ') || ''}
                                                        onChange={e => handleChoiceChange(id, choiceName, 'failure', { ...choice.failure, reward: e.target.value.split(', ') })}
                                                    />
                                                </div>
                                                <div className="mb-3 ms-4">
                                                    <label>Probability (Failure)</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Enter probability (failure)..."
                                                        value={choice.failure.probability}
                                                        onChange={e => handleChoiceChange(id, choiceName, 'failure', { ...choice.failure, probability: Number(e.target.value) })}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <div className="mb-3">
                                            <label>New Choice Name</label>
                                            <input
                                                className="form-control"
                                                placeholder="Enter new choice name..."
                                                value={newChoiceName}
                                                onChange={e => setNewChoiceName(e.target.value)}
                                            />
                                            <label>Success Response</label>
                                            <input
                                                className="form-control"
                                                placeholder="Enter success response..."
                                                value={newChoiceSuccessResponse}
                                                onChange={e => setNewChoiceSuccessResponse(e.target.value)}
                                            />
                                            <label>Failure Response</label>
                                            <input
                                                className="form-control"
                                                placeholder="Enter failure response..."
                                                value={newChoiceFailureResponse}
                                                onChange={e => setNewChoiceFailureResponse(e.target.value)}
                                            />
                                            <button className="btn btn-primary" onClick={() => handleAddChoice(id)}>Add Choice</button>
                                        </div>
                                    </div>
                                ))}
                                <button className="btn btn-success mb-3" onClick={handleAddScenario}>Add Scenario</button>
                                <br />
                                {/* <button className="btn btn-secondary" onClick={handleSave}>Save Changes</button> */}
                                <button className="btn btn-info" onClick={handleDownloadJSON}>Download JSON</button>
                            </div> </>) : (<h4> You have no access. Try to change account. </h4>)}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Journey;
