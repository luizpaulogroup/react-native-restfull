import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, FlatList, Text } from 'react-native';

import { ListItem, Icon } from 'react-native-elements';

import api from '../../services/api';

import styles from './styles';

export default function Home({ navigation }) {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getData();

        if (loading) {
            getData();
        }

    }, [loading]);

    const getData = async () => {

        try {

            const { data } = await api.get('projects');

            setProjects(data);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            alert(error.message);
        }

    }

    const deleteItem = async id => {

        try {

            await api.delete(`projects/${id}`);

            const index = projects.findIndex((item) => item.id === id);

            const newProjects = [...projects];

            newProjects.splice(index, 1);

            setProjects(newProjects);

        } catch (error) {
            alert(error.message);
        }

    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            {projects.length === 0 && <Text style={{ alignSelf: 'center', fontWeight: '700', marginTop: 25 }}>0 REGISTROS</Text>}
            <FlatList
                onRefresh={() => setLoading(true)}
                refreshing={loading}
                keyExtractor={(item) => String(item.id)}
                data={projects}
                renderItem={({ item }) => (
                    <ListItem
                        bottomDivider
                        title={item.title}
                        subtitle={`Código: ${item.id}`}
                        onPress={() => navigation.navigate('Details', { project: item })}
                        rightIcon={
                            <Icon
                                color="gray"
                                name="delete"
                                onPress={() => deleteItem(item.id)}
                            />
                        }
                    />
                )}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Details')}
                style={styles.buttonCreate}>
                <Icon name="add" reverse color="#F05" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}