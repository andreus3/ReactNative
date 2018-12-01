import React, { Component } from 'react'
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import commonStyles from '../commonStyles'
import backgroudImage from '../../assets/imgs/login.jpg'
import If from '../components/If'

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    singninOrSignup = () => {
        if (this.state.stageNew) {
            Alert.alert('Sucesso!', 'Criar conta')
        }
        else {
            Alert.alert('Sucesso!', 'Logar')
        }
    }

    render() {
        return (
            <ImageBackground source={backgroudImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    <If test={this.state.stageNew}>
                        <TextInput placeholder='Nome' style={styles.input} value={this.state.name} onChangeText={() => this.setState({ name })} />
                    </If>
                    <TextInput placeholder='Email' style={styles.input} value={this.state.email} onChangeText={() => this.setState({ email })} />
                    <TextInput placeholder='Senha' style={styles.input} value={this.state.password} onChangeText={() => this.setState({ password })} />
                    <If test={this.state.stageNew}>
                        <TextInput placeholder='Confirmação' style={styles.input} value={this.state.confirmPassword} onChangeText={() => this.setState({ confirmPassword })} />
                    </If>
                    <TouchableOpacity onPress={this.singninOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui Conta?' : 'Ainda não possui conta?'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground >
        )
    }

}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    }
})
