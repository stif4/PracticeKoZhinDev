import React from 'react';
import {MultiValue} from 'react-select';
import useDebounce from '../../../../hooks/useDebounce';
import {useLazyGetTagsQuery} from '../../../../store/api/postApi';
import {ITagNormolaized} from '../../../../store/api/types';
import Button from '../../../Button';
import InputSelectMulti from '../inputSelectMulti';

interface IInputSelectMultiTagsProps {
    value: ITagNormolaized[];
    id: string;
    error?: boolean;
    onChange: (name: string, value: MultiValue<ITagNormolaized>) => void;
    onReset: (name: string) => void;
}

export default function InputSelectMultiTags({value: currentTags, id, error, onChange, onReset}: IInputSelectMultiTagsProps) {
    const [newTags, setNewTags] = React.useState<ITagNormolaized[]>([]);
    const [options, setOptions] = React.useState<ITagNormolaized[]>([]);

    const [inputValue, setInputValue] = React.useState<string>('');
    const debounced = useDebounce(inputValue, 500);

    const [fetchTags, listTags] = useLazyGetTagsQuery();
    const {data, isFetching} = listTags;

    const findSameTag = (array: ITagNormolaized[], newTag: string) => array.some((elem) => elem.value === newTag);

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleChange = (tags: MultiValue<ITagNormolaized>) => {
        onChange('tags', tags);
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        if (!findSameTag(options, inputValue)) {
            const newTag = {value: inputValue, label: '#' + inputValue, id: '#' + inputValue};

            setNewTags((prev) => [...prev, newTag]);
            handleChange([...currentTags, newTag]);
            setInputValue('');
        }
    };

    const clearTags = () => {
        onReset('tags');
    };

    const handleKeyPress = () => {};

    React.useEffect(() => {
        fetchTags('', true);
    }, []);

    React.useEffect(() => {
        fetchTags(inputValue, true);
    }, [debounced]);

    React.useEffect(() => {
        if (data) {
            setOptions([...newTags, ...data]);
        } else {
            setOptions([...newTags]);
        }
    }, [newTags, data]);

    return (
        <div className="InputSelectMultiTags">
            <InputSelectMulti
                name="tags"
                label="Теги"
                menuPlacement="top"
                placeholder="Укажите теги"
                id={id}
                options={options}
                value={currentTags}
                inputValue={inputValue}
                onChange={handleChange}
                onInputChange={handleInputChange}
                onMenuClose={() => setInputValue(inputValue)}
                error={error}
            >
                <div className="InputSelectMulti__actions">
                    <div className="InputSelectMulti__addButton">
                        <Button
                            label="#добавить"
                            className="Button__main_empty Button__main_empty_colorGray Button__main_empty_colorGray_small"
                            onClick={handleClick}
                        />
                    </div>
                    <div
                        className="InputSelectMulti__iconContainer"
                        onClick={clearTags}
                        onKeyPress={handleKeyPress}
                        role="button"
                        tabIndex={0}
                    >
                        <img
                            src="./icons/cross.svg"
                            alt="icon"
                            className="InputSelectMulti__closeIcon"
                        />
                    </div>
                </div>
            </InputSelectMulti>
        </div>
    );
}
