import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Alert, StyleSheet, AsyncStorage } from 'react-native'
import commonStyles from '../commonStyles'
import backgroudImage from '../../assets/imgs/login.jpg'
import If from '../components/If'
import AuthInput from '../components/AuthInput'
import axios from 'axios'
import { server, showError } from '../common'

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    singnin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            AsyncStorage.setItem('userData',JSON.stringify(res.data))
            this.props.navigation.navigate('Home', res.data)

        }
        catch (err) {
            Alert.alert('Erro', 'Falha no Login!')
        }
    }

    singup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })

            Alert.alert('Sucesso!', 'Usuário cadastrado :)')
            this.setState({ stageNew: false })
        }
        catch (err) {
            showError(err)
        }
    }

    singninOrSignup = () => {
        if (this.state.stageNew) {
            this.singup()
        }
        else {
            this.singnin()
        }
    }

    validateEmail = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(this.state.email).toLowerCase().trim())
    }

    render() {
        const validations = []

        validations.push(this.state.email && this.validateEmail())
        validations.push(this.state.password && this.state.password.trim().length >= 6)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim())
            validations.push(this.state.confirmPassword)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        validForm = validations.reduce((all, v) => v && all)


        return (
            <ImageBackground source={backgroudImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    <If test={this.state.stageNew}>
                        <AuthInput icon='user' placeholder='Nome' style={styles.input} value={this.state.name} onChangeText={name => this.setState({ name })} />
                    </If>
                    <AuthInput icon='at' placeholder='Email' style={styles.input} value={this.state.email} onChangeText={email => this.setState({ email })} />
                    <AuthInput icon='lock' secureTextEntry={true} placeholder='Senha' style={styles.input} value={this.state.password} onChangeText={password => this.setState({ password })} />
                    <If test={this.state.stageNew}>
                        <AuthInput icon='asterisk' secureTextEntry={true} placeholder='Confirme sua senha' style={styles.input} value={this.state.confirmPassword} onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    </If>
                    <TouchableOpacity disabled={!validForm} onPress={this.singninOrSignup}>
                        <View style={[styles.button, !validForm ? { backgroundColor: '#AAA' } : {}]}>
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
