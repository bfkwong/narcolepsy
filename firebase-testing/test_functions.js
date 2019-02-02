import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import {Constants} from 'expo';

export function addone(x) {
  return x + 1;
}

export function binarySearchInsertion(element, array, lower, upper) {
    index = (upper - lower) / 2;
    comp = array[index];
    if (upper > lower && postComp(element, comp) > 0)
        return binarySearchInsertion(element, array, index, upper);
    else if (upper > lower && postComp(element, comp) < 0)
        return binarySearchInsertion(element, array, lower, index);
    return array.slice(0, index).concat([element]).concat(array.slice(index, array.length))
}

export function postComp(post1, post2) {
    if (post1.score == post2.score)
        return stringComp(post1.title, post2.title);
    return post1.score - post2.score;
}

export function stringComp(string1, string2) {
    let i = 0;
    let result = 0;
    while (string1[i] == string2[i] && i < string1.length && i < string2.length)
        i++;
    result = string1[i-1] - string2[i-1];
    if (result == 0) {
        if (string1.length < string2.length)
            return -1;
        else if (string1.length > string2.length)
            return 1;
    }
    return result
}

export function sortPosts(messages) {
    let result = [];
    for (post in messages) {
        if (result.length == 0)
            result.push(messages[0]);
        else
            result = binarySearchInsertion(post, result, 0, result.length);
    }
    return result;
}