import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, TouchableOpacity, ScrollView, Text } from 'react-native';

import { StackActions } from '@react-navigation/native';

import { Input, Icon } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import api from '../../services/api';

import styles from './styles';

export default function Details({ navigation, route }) {

    const project = route.params ? route.params.project : false;

    const [loading, setLoading] = useState(false);

    const [formTitle, setTitle] = useState('');
    const [formDescription, setDescription] = useState('');
    const [formImage, setImage] = useState(false);

    useEffect(() => {

        if (project) {
            getProject();
        }

    }, [project]);

    const getProject = async () => {

        const { data } = await api.get(`projects/${project.id}`);

        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);

    };

    const onSubmit = () => project ? onUpdate() : onCreate();

    const onCreate = async () => {

        setLoading(true);

        try {

            await api.post('projects', {
                title: formTitle,
                description: formDescription,
                image: formImage
            })

            navigation.dispatch(StackActions.pop(1));

        } catch (error) {
            alert(error.message);
        }

        setLoading(false);
    }

    const onUpdate = async () => {

        setLoading(true);

        try {

            await api.put(`projects/${project.id}`, {
                title: formTitle,
                description: formDescription,
                image: formImage
            });

            navigation.dispatch(StackActions.pop(1));

        } catch (error) {
            alert(error.message);
        }

        setLoading(false);

    }

    const getImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync();

        const manipulator = await ImageManipulator.manipulateAsync(
            result.uri,
            [{ resize: { width: 80, height: 80 } }],
            { base64: true }
        );

        setImage(`data:image/jpg;base64,${manipulator.base64}`);

    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity
                    style={styles.chooseImage}
                    onPress={() => getImage()}>
                    <Image source={{ uri: formImage ? formImage : 'https://avatars0.githubusercontent.com/u/37484860?s=460&u=7b67ba28d530723467f5b0e86d6578d2aa57bf99&v=4' }} style={styles.logo} />
                </TouchableOpacity>

                <Input value={formTitle} onChangeText={setTitle} placeholder="Nome do projeto"></Input>
                <Input value={formDescription} onChangeText={setDescription} placeholder="Descrição"></Input>
                <TouchableOpacity loading={loading} onPress={onSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>ENVIAR</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}