import React from 'react';
import {MultiValue} from 'react-select';
import useDebounce from '../../../../hooks/useDebounce';
import {useLazyGetTagsQuery} from '../../../../store/api/postApi';
import {ITagNormolaized} from '../../../../store/api/types';
import Button from '../../../Button';
import InputSelectMulti from '../inputSelectMulti';

interface IInputSelectMultiTagsFilterProps {
    value: ITagNormolaized[];
    id: string;
    error?: boolean;
    onChange: (tags: MultiValue<ITagNormolaized>) => void;
    onReset: () => void;
}

export default function InputSelectMultiTagsFilter({value: currentTags, id, error, onChange, onReset}: IInputSelectMultiTagsFilterProps) {
    const [options, setOptions] = React.useState<ITagNormolaized[]>([]);

    const [inputValue, setInputValue] = React.useState<string>('');
    const debounced = useDebounce(inputValue, 500);

    const [fetchTags, listTags] = useLazyGetTagsQuery();
    const {data, isFetching} = listTags;

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleChange = (tags: MultiValue<ITagNormolaized>) => {
        onChange(tags);
        setInputValue('');
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        setInputValue('');
    };

    const clearTags = () => {
        onReset();
    };

    const handleKeyPress = () => {};

    React.useEffect(() => {
        if (data) {
            setOptions(data);
        }
    }, [data]);

    React.useEffect(() => {
        fetchTags('', true);
    }, []);

    React.useEffect(() => {
        fetchTags(inputValue, true);
    }, [debounced]);

    return (
        <div className="InputSelectMultiTags">
            <InputSelectMulti
                name="tags"
                menuPlacement="bottom"
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
                            label="Фильтровать"
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
